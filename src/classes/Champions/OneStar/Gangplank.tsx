import { Champion } from "../Champion"

export class Gangplank extends Champion {
  traits = ['supers', 'duelist']
  rarity: number = 1

  constructor () {
    super({ name: 'Gangplank' })
  }
}
