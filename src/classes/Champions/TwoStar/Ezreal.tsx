import { Champion } from "../Champion"

export class Ezreal extends Champion {
  traits = ['underground', 'parallel', 'quickdraw']
  rarity: number = 2

  constructor () {
    super({ name: 'Ezreal' })
  }
}
