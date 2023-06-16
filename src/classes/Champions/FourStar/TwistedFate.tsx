import { Champion } from "../Champion"

export class TwistedFate extends Champion {
  traits = ['infiniteam', 'duelist', 'spellslinger']
  rarity: number = 4

  constructor () {
    super({ name: 'Twisted Fate' })
  }
}
