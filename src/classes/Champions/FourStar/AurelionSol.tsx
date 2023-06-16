import { Champion } from "../Champion"

export class AurelionSol extends Champion {
  traits = ['threat']
  rarity: number = 4

  constructor () {
    super({ name: 'Aurelion Sol' })
  }
}
