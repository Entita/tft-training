import { Champion } from "../Champion"

export class LeBlanc extends Champion {
  traits = ['admin', 'hacker', 'spellslinger']
  rarity: number = 3

  constructor () {
    super({ name: 'LeBlanc' })
  }
}
