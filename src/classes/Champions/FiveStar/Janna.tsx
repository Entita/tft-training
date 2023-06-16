import { Champion } from "../Champion"

export class Janna extends Champion {
  traits = ['spellslinger', 'forecaster']
  rarity: number = 5

  constructor () {
    super({ name: 'Janna' })
  }
}
