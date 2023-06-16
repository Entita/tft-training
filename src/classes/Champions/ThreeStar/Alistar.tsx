import { Champion } from "../Champion"

export class Alistar extends Champion {
  traits = ['oxforce', 'aegis', 'mascot']
  rarity: number = 3

  constructor () {
    super({ name: 'Alistar' })
  }
}
