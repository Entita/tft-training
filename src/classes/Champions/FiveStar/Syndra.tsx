import { Champion } from "../Champion"

export class Syndra extends Champion {
  traits = ['starguardian', 'heart']
  rarity: number = 5

  constructor () {
    super({ name: 'Syndra' })
  }
}
