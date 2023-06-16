import { Champion } from "../Champion"

export class Jinx extends Champion {
  traits = ['animasquad', 'prankster']
  rarity: number = 2

  constructor () {
    super({ name: 'Jinx' })
  }
}
