import { Champion } from "../Champion"

export class LeeSin extends Champion {
  traits = ['supers', 'brawler', 'heart']
  rarity: number = 2

  constructor () {
    super({ name: 'Lee Sin' })
  }
}
