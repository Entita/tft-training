import { Champion } from "../Champion"

export class Ashe extends Champion {
  traits = ['lasercorps', 'sureshot']
  rarity: number = 1

  constructor () {
    super({ name: 'Ashe' })
  }
}
