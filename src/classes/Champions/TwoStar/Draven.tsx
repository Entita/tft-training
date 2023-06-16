import { Champion } from "../Champion"

export class Draven extends Champion {
  traits = ['mechaprime', 'ace']
  rarity: number = 2

  constructor () {
    super({ name: 'Draven' })
  }
}
