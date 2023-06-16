import { Champion } from "../Champion"

export class Lux extends Champion {
  traits = ['starguardian', 'spellslinger']
  rarity: number = 1

  constructor () {
    super({ name: 'Lux' })
  }
}
