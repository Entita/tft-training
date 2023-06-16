import { Champion } from "../Champion"

export class Vex extends Champion {
  traits = ['riftwalker', 'mascot']
  rarity: number = 3

  constructor () {
    super({ name: 'Vex' })
  }
}
