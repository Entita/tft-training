import { Champion } from "../Champion"

export class Urgot extends Champion {
  traits = ['threat']
  rarity: number = 5

  constructor () {
    super({ name: 'Urgot' })
  }
}
