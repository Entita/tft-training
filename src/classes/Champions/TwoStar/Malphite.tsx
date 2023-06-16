import { Champion } from "../Champion"

export class Malphite extends Champion {
  traits = ['supers', 'mascot']
  rarity: number = 2

  constructor () {
    super({ name: 'Malphite' })
  }
}
