import { Champion } from "../Champion"

export class Warwick extends Champion {
  traits = ['admin', 'lasercorps', 'brawler']
  rarity: number = 4

  constructor () {
    super({ name: 'Warwick' })
  }
}
