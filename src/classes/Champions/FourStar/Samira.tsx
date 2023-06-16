import { Champion } from "../Champion"

export class Samira extends Champion {
  traits = ['underground', 'sureshot', 'ace']
  rarity: number = 4

  constructor () {
    super({ name: 'Samira' })
  }
}
