import { Champion } from "../Champion"

export class Yasuo extends Champion {
  traits = ['lasercorps', 'duelist']
  rarity: number = 2

  constructor () {
    super({ name: 'Yasuo' })
  }
}
