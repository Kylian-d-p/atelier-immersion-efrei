import { Fighter } from "./fighter.js";

/**
 * Generates a fight between two fighters
 *
 * @param {Fighter} fighter1 The first fighter
 * @param {Fighter} fighter2 The second fighter
 * @returns {string} The fight history
 */
export function generateFight(fighter1, fighter2) {
  let history = "";

  const playingQueue = [fighter1, fighter2].sort(() => Math.random() - 0.5);

  while (fighter1.isAlive() && fighter2.isAlive()) {
    const attacker = playingQueue.shift();
    const defender = playingQueue[0];

    const damage = attacker.attackFighter(defender);
    history += `${attacker.nickname} envoie ${damage.trueDamages} de dégats à ${defender.nickname}, ${defender.nickname} a pu se défendre et a tanké ${damage.absorbedDamages} de dégâts. Ainsi, ${defender.nickname} a reçu ${damage.trueDamages} dégâts réels.\n`;

    playingQueue.push(attacker);
  }
  history += `${fighter1.isAlive() ? fighter1.nickname : fighter2.nickname} a gagné !\n`;

  return history;
}
