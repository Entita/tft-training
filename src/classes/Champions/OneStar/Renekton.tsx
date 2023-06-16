import { Champion } from "../Champion"

export class Renekton extends Champion {
  traits = ['lasercorps', 'brawler']
  rarity: number = 1

  constructor () {
    super({ name: 'Renekton' })
  }
}
