import { Champion } from "../Champion"

export class Kayle extends Champion {
  traits = ['underground', 'duelist']
  rarity: number = 1

  constructor () {
    super({ name: 'Kayle' })
  }
}
