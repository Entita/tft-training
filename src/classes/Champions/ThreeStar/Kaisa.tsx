import { Champion } from "../Champion"

export class Kaisa extends Champion {
  traits = ['starguardian', 'quickdraw']
  rarity: number = 3

  constructor () {
    super({ name: 'Kai\'Sa' })
  }
}
