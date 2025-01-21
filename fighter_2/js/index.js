import fighter2 from "./fighter2.js";
import { exportElement } from "../../js/exporter.js";

document.querySelector("#stats-attack").innerText = fighter2.attack;
document.querySelector("#stats-defense").innerText = fighter2.defense;
document.querySelector("#stats-health").innerText = fighter2.health;
document.querySelector("#fighter-name").innerText = fighter2.nickname;
document.querySelector(".exporter").addEventListener("click", () => {
  exportElement(document.querySelector(".fighter-container"));
});
