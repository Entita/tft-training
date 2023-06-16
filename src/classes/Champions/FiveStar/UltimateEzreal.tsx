import { Champion } from "../Champion"

export class UltimateEzreal extends Champion {
  traits = ['infiniteam', 'parallel', 'sureshot']
  rarity: number = 5

  constructor () {
    super({ name: 'Ultimate Ezreal' })
  }
}
