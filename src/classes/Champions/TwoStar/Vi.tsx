import { Champion } from "../Champion"

export class Vi extends Champion {
  traits = ['underground', 'aegis', 'brawler']
  rarity: number = 2

  constructor () {
    super({ name: 'Vi' })
  }
}
