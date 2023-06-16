import { Champion } from "../Champion"

export class Garen extends Champion {
  traits = ['mechaprime', 'defender']
  rarity: number = 4

  constructor () {
    super({ name: 'Garen' })
  }
}
