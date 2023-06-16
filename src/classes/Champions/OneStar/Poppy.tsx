import { Champion } from "../Champion"

export class Poppy extends Champion {
  traits = ['gadgeteen', 'defender']
  rarity: number = 1

  constructor () {
    super({ name: 'Poppy' })
  }
}
