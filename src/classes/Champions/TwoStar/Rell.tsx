import { Champion } from "../Champion"

export class Rell extends Champion {
  traits = ['starguardian', 'defender']
  rarity: number = 2

  constructor () {
    super({ name: 'Rell' })
  }
}
