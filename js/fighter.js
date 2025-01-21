/**
 * Represents a fighter.
 *
 * @class
 * @property {string} nickname - The nickname of the fighter.
 * @property {number} health - The health points of the fighter.
 * @property {number} attack - The attack points of the fighter.
 * @property {number} defense - The defense points of the fighter.
 * @property {number} diceFacesCount - The number of faces of the dice used by the fighter.
 * @method isAlive - Indicates whether the fighter is alive.
 * @method attackFighter - Attacks another fighter.
 * @method defendAttack - Defends an attack.
 */
export class Fighter {
  #nickname;
  #health;
  #attack;
  #defense;
  #diceFacesCount;
  constructor(nickname = "DefaultFighterNickname", health = 20, attack = 8, defense = 7, diceFacesCount = 6) {
    this.#nickname = nickname;
    this.#health = health;
    this.#attack = attack;
    this.#defense = defense;
    this.#diceFacesCount = diceFacesCount;
  }

  #rollDice() {
    return Math.floor(Math.random() * this.#diceFacesCount) + 1;
  }

  get nickname() {
    return this.#nickname;
  }

  get attack() {
    return this.#attack;
  }

  get defense() {
    return this.#defense;
  }

  get health() {
    return this.#health;
  }

  get diceFacesCount() {
    return this.#diceFacesCount;
  }

  isAlive() {
    return this.#health > 0;
  }

  /**
   * Attacks another fighter.
   *
   * @param {Fighter} otherFighter - The fighter to be attacked.
   * @returns {{trueDamages: number, absorbedDamages: number}} - The dealt and real damages.
   * @throws {Error} - If the argument is not an instance of Fighter.
   */
  attackFighter(otherFighter) {
    if (!(otherFighter instanceof Fighter)) {
      throw new Error("Argument must be an instance of Fighter");
    }
    const attack = this.#attack + this.#rollDice();
    const trueDamages = otherFighter.defendAttack(attack);

    return { trueDamages, absorbedDamages: attack - trueDamages };
  }

  /**
   * Defends an attack.
   *
   * @param {number} attack - The attack value.
   * @returns {number} - The remaining health points.
   */
  defendAttack(attack) {
    const defense = this.#defense + this.#rollDice();
    let damage = Math.max(0, attack - defense);
    this.#health -= damage;
    return damage;
  }
}
