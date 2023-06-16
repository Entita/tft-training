import { Champion } from "../Champion"

export class Sona extends Champion {
  traits = ['underground', 'heart', 'spellslinger']
  rarity: number = 3

  constructor () {
    super({ name: 'Sona' })
  }
}
