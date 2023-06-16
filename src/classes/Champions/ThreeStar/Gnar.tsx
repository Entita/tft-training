import { Champion } from "../Champion"

export class Gnar extends Champion {
  traits = ['gadgeteen', 'prankster']
  rarity: number = 3

  constructor () {
    super({ name: 'Gnar' })
  }
}
