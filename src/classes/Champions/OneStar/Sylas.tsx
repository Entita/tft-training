import { Champion } from "../Champion"

export class Sylas extends Champion {
  traits = ['animasquad', 'renegade']
  rarity: number = 1

  constructor () {
    super({ name: 'Sylas' })
  }
}
