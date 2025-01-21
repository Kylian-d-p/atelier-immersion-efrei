import fighter1 from "./fighter1.js";
import { exportElement } from "../../js/exporter.js";

document.querySelector("#stats-attack").innerText = fighter1.attack;
document.querySelector("#stats-defense").innerText = fighter1.defense;
document.querySelector("#stats-health").innerText = fighter1.health;
document.querySelector("#fighter-name").innerText = fighter1.nickname;
document.querySelector(".exporter").addEventListener("click", () => {
  exportElement(document.querySelector(".fighter-container"));
});
