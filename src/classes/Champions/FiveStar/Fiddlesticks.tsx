import { Champion } from "../Champion"

export class Fiddlesticks extends Champion {
  traits = ['corrupted', 'threat']
  rarity: number = 5

  constructor () {
    super({ name: 'Fiddlesticks' })
  }
}
