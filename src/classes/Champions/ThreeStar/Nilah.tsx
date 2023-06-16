import { Champion } from "../Champion"

export class Nilah extends Champion {
  traits = ['starguardian', 'duelist']
  rarity: number = 3

  constructor () {
    super({ name: 'Nilah' })
  }
}
