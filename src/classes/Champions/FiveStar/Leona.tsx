import { Champion } from "../Champion"

export class Leona extends Champion {
  traits = ['mechaprime', 'aegis', 'renegade']
  rarity: number = 5

  constructor () {
    super({ name: 'Leona' })
  }
}
