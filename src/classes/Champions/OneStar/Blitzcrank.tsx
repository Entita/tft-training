import { Champion } from "../Champion"

export class Blitzcrank extends Champion {
  traits = ['admin', 'brawler']
  rarity: number = 1

  constructor () {
    super({ name: 'Blitzcrank' })
  }
}
