import { Champion } from "../Champion"

export class BelVeth extends Champion {
  traits = ['threat']
  rarity: number = 4

  constructor () {
    super({ name: 'Bel\'Veth' })
  }
}
