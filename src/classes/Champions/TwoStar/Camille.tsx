import { Champion } from "../Champion"

export class Camille extends Champion {
  traits = ['admin', 'renegade']
  rarity: number = 2

  constructor () {
    super({ name: 'Camille' })
  }
}
