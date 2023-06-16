import { Champion } from "../Champion"

export class Mordekaiser extends Champion {
  traits = ['lasercorps', 'ace']
  rarity: number = 5

  constructor () {
    super({ name: 'Mordekaiser' })
  }
}
