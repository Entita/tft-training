import { Champion } from "../Champion"

export class Pantheon extends Champion {
  traits = ['infiniteam', 'heart']
  rarity: number = 1

  constructor () {
    super({ name: 'Pantheon' })
  }
}
