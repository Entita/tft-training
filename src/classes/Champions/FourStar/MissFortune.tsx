import { Champion } from "../Champion"

export class MissFortune extends Champion {
  traits = ['animasquad', 'ace', 'quickdraw']
  rarity: number = 4

  constructor () {
    super({ name: 'Miss Fortune' })
  }
}
