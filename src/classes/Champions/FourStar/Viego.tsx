import { Champion } from "../Champion"

export class Viego extends Champion {
  traits = ['oxforce', 'renegade', 'heart']
  rarity: number = 4

  constructor () {
    super({ name: 'Viego' })
  }
}
