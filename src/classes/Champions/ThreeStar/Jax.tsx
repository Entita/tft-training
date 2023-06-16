import { Champion } from "../Champion"

export class Jax extends Champion {
  traits = ['mechaprime', 'brawler']
  rarity: number = 3

  constructor () {
    super({ name: 'Jax' })
  }
}
