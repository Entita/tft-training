import { Champion } from "../Champion"

export class Lucian extends Champion {
  traits = ['infiniteam', 'quickdraw', 'renegade']
  rarity: number = 1

  constructor () {
    super({ name: 'Lucian' })
  }
}
