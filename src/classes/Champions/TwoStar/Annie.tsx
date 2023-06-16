import { Champion } from "../Champion"

export class Annie extends Champion {
  traits = ['spellslinger', 'gadgeteen', 'oxforce']
  rarity: number = 2

  constructor () {
    super({ name: 'Annie' })
  }
}
