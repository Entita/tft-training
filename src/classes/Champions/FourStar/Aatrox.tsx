import { Champion } from "../Champion"

export class Aatrox extends Champion {
  traits = ['threat']
  rarity: number = 4

  constructor () {
    super({ name: 'Aatrox' })
  }
}
