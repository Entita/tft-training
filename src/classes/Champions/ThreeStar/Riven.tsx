import { Champion } from "../Champion"

export class Riven extends Champion {
  traits = ['animasquad', 'brawler', 'defender']
  rarity: number = 3

  constructor () {
    super({ name: 'Riven' })
  }
}
