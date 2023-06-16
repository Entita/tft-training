import { Champion } from "../Champion"

export class Neeko extends Champion {
  traits = ['starguardian', 'spellslinger']
  rarity: number = 4

  constructor () {
    super({ name: 'Neeko' })
  }
}
