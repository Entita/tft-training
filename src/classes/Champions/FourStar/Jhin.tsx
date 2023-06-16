import { Champion } from "../Champion"

export class Jhin extends Champion {
  traits = ['riftwalker', 'renegade']
  rarity: number = 4

  constructor () {
    super({ name: 'Jhin' })
  }
}
