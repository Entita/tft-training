import { Champion } from "../Champion"

export class Lulu extends Champion {
  traits = ['gadgeteen', 'heart']
  rarity: number = 1

  constructor () {
    super({ name: 'Lulu' })
  }
}
