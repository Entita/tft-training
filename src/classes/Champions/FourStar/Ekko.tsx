import { Champion } from "../Champion"

export class Ekko extends Champion {
  traits = ['starguardian', 'prankster', 'aegis']
  rarity: number = 4

  constructor () {
    super({ name: 'Ekko' })
  }
}
