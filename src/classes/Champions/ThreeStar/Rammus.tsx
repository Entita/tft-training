import { Champion } from "../Champion"

export class Rammus extends Champion {
  traits = ['threat']
  rarity: number = 3

  constructor () {
    super({ name: 'Rammus' })
  }
}
