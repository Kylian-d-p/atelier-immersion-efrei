import fighter1 from "../fighter_1/js/fighter1.js";
import fighter2 from "../fighter_2/js/fighter2.js";
import arbitrate from "./arbitration.js";
import { generateFight } from "./fight.js";
import { Fighter } from "./fighter.js";

const logsElement = document.querySelector("#logs");
const storyElement = document.querySelector("#story");

document.querySelector("#start-fight").addEventListener("click", async () => {
  if (!arbitrate(fighter1, fighter2)) {
    alert("Les statistiques des combattants ne sont pas équilibrées, le combat ne peut pas avoir lieu.");
    return;
  }

  const gameLogs = generateFight(
    new Fighter(fighter1.nickname, fighter1.health, fighter1.attack, fighter1.defense, fighter1.diceFacesCount),
    new Fighter(fighter2.nickname, fighter2.health, fighter2.attack, fighter2.defense, fighter2.diceFacesCount)
  );

  logsElement.innerText = gameLogs;

  logsElement.classList.remove("muted");

  storyElement.innerText = "Génération de l'histoire...";

  document.querySelector("#start-fight").disabled = true;

  const hostRes = await fetch("/host.json");

  if (!hostRes.ok) {
    alert("Un erreur est survenue");
  }

  const { host } = await hostRes.json();

  const generationRes = await fetch(`http://${host}:11434/api/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      stream: true,
      model: "llama3.1:latest",
      prompt: `Un combat entre ${fighter1.nickname} et ${fighter2.nickname} a eu lieu.
      Voici les statistiques de ces combattants :
      - ${fighter1.nickname} : ${fighter1.health} points de vie, ${fighter1.attack} points d'attaque, ${fighter1.defense} points de défense, un dé à ${fighter1.diceFacesCount} faces.
      - ${fighter2.nickname} : ${fighter2.health} points de vie, ${fighter2.attack} points d'attaque, ${fighter2.defense} points de défense, un dé à ${fighter2.diceFacesCount} faces.

      Le dé est jeté à chaque attaque et chaque défense, cela permet d'ajouter des points de compétences supplémentaires.
      
      Voici le résumé de ce combat : ${gameLogs}.
      Rédige un texte de 3 ou 4 phrases pour décrire ce combat de façon épique, tu n'as pas besoin de décrire les statistiques des combattants, concenttre-toi sur les échanges de coups et imagine une histoire héroïque.
      Il faut que tu ne me retournes que le texte en question, sans phrase parasite d'introduction.`,
    }),
  });

  if (generationRes.ok) {
    const reader = generationRes.body.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let buffer = "";
    storyElement.innerText = "";
    storyElement.classList.remove("muted");

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split("\n");
      buffer = lines.pop();

      lines.forEach((line) => {
        if (line.trim()) {
          const spanElement = document.createElement("span");
          spanElement.innerText = JSON.parse(line).response;
          storyElement.appendChild(spanElement);
        }
      });
    }
  } else {
    alert("Aïe... Il y a eu une erreur.");
  }

  document.querySelector("#start-fight").disabled = false;
});
