import { Champion } from "../Champion"

export class Nunu extends Champion {
  traits = ['gadgeteen', 'mascot']
  rarity: number = 5

  constructor () {
    super({ name: 'Nunu' })
  }
}
