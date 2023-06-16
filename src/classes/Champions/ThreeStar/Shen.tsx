import { Champion } from "../Champion"

export class Shen extends Champion {
  traits = ['infiniteam', 'defender', 'hacker']
  rarity: number = 3

  constructor () {
    super({ name: 'Shen' })
  }
}
