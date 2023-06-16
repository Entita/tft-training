import { Champion } from "../Champion"

export class Sivir extends Champion {
  traits = ['infiniteam', 'sureshot']
  rarity: number = 2

  constructor () {
    super({ name: 'Sivir' })
  }
}
