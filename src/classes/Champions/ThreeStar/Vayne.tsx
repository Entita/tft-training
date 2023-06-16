import { Champion } from "../Champion"

export class Vayne extends Champion {
  traits = ['animasquad', 'duelist']
  rarity: number = 3

  constructor () {
    super({ name: 'Vayne' })
  }
}
