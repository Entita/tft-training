import { Champion } from "../Champion"

export class Pyke extends Champion {
  traits = ['riftwalker', 'hacker']
  rarity: number = 2

  constructor () {
    super({ name: 'Pyke' })
  }
}
