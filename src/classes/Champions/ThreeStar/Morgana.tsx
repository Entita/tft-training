import { Champion } from "../Champion"

export class Morgana extends Champion {
  traits = ['threat']
  rarity: number = 3

  constructor () {
    super({ name: 'Morgana' })
  }
}
