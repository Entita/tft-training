import { nanoid } from 'nanoid'

type championProps = {
  name: string
}

export class Champion {
  id: string
  star: number = 1
  name: string

  constructor (props: championProps) {
    this.id = nanoid()
    this.name = props.name
  }

  newId () {
    this.id = nanoid()
  }
}
