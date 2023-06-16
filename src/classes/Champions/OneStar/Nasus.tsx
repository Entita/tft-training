import { Champion } from "../Champion"

export class Nasus extends Champion {
  traits = ['animasquad', 'mascot']
  rarity: number = 1

  constructor () {
    super({ name: 'Nasus' })
  }
}
