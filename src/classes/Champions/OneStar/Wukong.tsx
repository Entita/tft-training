import { Champion } from "../Champion"

export class Wukong extends Champion {
  traits = ['mechaprime', 'defender']
  rarity: number = 1

  constructor () {
    super({ name: 'Wukong' })
  }
}
