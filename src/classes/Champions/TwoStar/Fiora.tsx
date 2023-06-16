import { Champion } from "../Champion"

export class Fiora extends Champion {
  traits = ['duelist', 'oxforce']
  rarity: number = 2

  constructor () {
    super({ name: 'Fiora' })
  }
}
