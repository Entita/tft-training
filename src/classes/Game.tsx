import { gameStateType } from "@/components/StartingPage"
import { ChampSelections } from "./ChampSelections"
import { chancesTable } from "./Champions/ChampionsPool"

type gameStateProps = {
  canvas: HTMLCanvasElement
  gameState: gameStateType
  setGameState: Function
}

export class Game {
  timer = {
    paused: false,
    minutes: '0',
    seconds: '0',
    milliseconds: '0',
  }
  timerStart: Date = new Date()
  timeUpdate: any = null

  canvas: HTMLCanvasElement
  hitboxCanvas: HTMLCanvasElement
  animationsCanvas: HTMLCanvasElement
  scoreCanvas: HTMLCanvasElement
  setGameState: Function

  private animation: number = 0
  private fps = 60
  private fpsInterval = 1e3 / this.fps
  private startTime = Date.now()
  private then = this.startTime

  private champSelection: ChampSelections
  private mousePosition: { x: number, y: number } = {
    x: 0,
    y: 0,
  }
  custom: boolean
  endless: boolean

  constructor (props: gameStateProps) {
    this.canvas = props.canvas
    this.setGameState = props.setGameState
    this.hitboxCanvas = document.createElement('canvas')
    this.animationsCanvas = document.createElement('canvas')
    this.scoreCanvas = document.createElement('canvas')
    this.custom = !props.gameState.leaderboardSettings
    this.endless = props.gameState.endless

    this.champSelection = new ChampSelections({
      level: props.gameState.level,
      gold: props.gameState.gold,
      thinkFast: props.gameState.thinkFast,
    })

    this.initialization()
    this.startListening()
  }

  initialization = () => {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.hitboxCanvas.width = window.innerWidth
    this.hitboxCanvas.height = window.innerHeight
    this.animationsCanvas.width = window.innerWidth
    this.animationsCanvas.height = window.innerHeight
    this.scoreCanvas.width = window.innerWidth
    this.scoreCanvas.height = window.innerHeight

    this.animationsCanvas.style.cssText = 'position: absolute; top: 0; left: 0'
    this.scoreCanvas.style.cssText = 'position: absolute; top: 0; left: 0'
    this.hitboxCanvas.style.cssText = 'position: absolute; top: 0; left: 0; opacity: .2; visibility: hidden'
    this.animationsCanvas.setAttribute('id', 'animations')
    this.scoreCanvas.setAttribute('id', 'score')
    this.hitboxCanvas.setAttribute('id', 'hitbox')

    const elements = document.querySelectorAll('#score, #hitbox, #animations')
    elements.forEach(element => element.remove())
    document.getElementById('canvasContainer')?.append(this.scoreCanvas, this.animationsCanvas, this.hitboxCanvas)

    this.champSelection.initialization(this.canvas, this.hitboxCanvas, this.custom)
  }

  setMousePosition = (target: any) => {
    this.mousePosition = {
      x: target.offsetX,
      y: target.offsetY,
    }
  }

  handleKeydown = (target: any) => {
    const pressedKey = target.key.toLowerCase()
      
    if (pressedKey === 'h') {
      this.hitboxCanvas.style.visibility = this.hitboxCanvas.style.visibility === 'visible' ? 'hidden' : 'visible'
      this.champSelection.initialization(this.canvas, this.hitboxCanvas, this.custom)
    } else if (pressedKey === 'd') {
      this.champSelection.refreshShop()
      this.champSelection.initialization(this.canvas, this.hitboxCanvas, this.custom)
    } else if (pressedKey === 'e') {
      const color = this.colorFromPosition(this.mousePosition.x, this.mousePosition.y)
      const clicked = this.champSelection.hitboxes[color as keyof typeof this.champSelection.hitboxes]
      if (!clicked) return

      const refresh = this.champSelection.sellChampion(clicked)
      if (refresh) this.champSelection.initialization(this.canvas, this.hitboxCanvas, this.custom)
    } else if (pressedKey === 'escape') {
      this.cancelGame()
    }
  }

  startListening = () => {
    window.addEventListener('resize', this.initialization)
    window.addEventListener('mousemove', this.setMousePosition)
    window.addEventListener('mousedown', this.handleClick)
    window.addEventListener('keydown', this.handleKeydown)
  }

  stopListening = () => {
    window.removeEventListener('resize', this.initialization)
    window.removeEventListener('mousemove', this.setMousePosition)
    window.removeEventListener('mousedown', this.handleClick)
    window.removeEventListener('keydown', this.handleKeydown)

    cancelAnimationFrame(this.animation)
    clearInterval(this.timeUpdate)
    document.body.style.cursor = 'default'
  }

  calculateScore = () => {
    const maxTimeScore = 5000
    const timeDecreasePerSecond = 25
    const completionTimeInMs = parseInt(this.timer.minutes) * 1e3 * 60 + parseInt(this.timer.seconds) * 1e3 + parseInt(this.timer.milliseconds) % 1e3
    const timeScore = Math.floor(Math.max(maxTimeScore - completionTimeInMs / 1e3 * timeDecreasePerSecond, 0))

    const threeStar = this.ownThreeStar()
    const missedChamps = this.champSelection.history.flat().reduce((prev, champ) => champ.name === threeStar.name && !champ.bought ? prev + 1 : prev, 0)
    const penalize = 1 - 0.15 * missedChamps > 0.3 ? 1 - 0.15 * missedChamps : 0.3

    const maxRarityScore = 5000
    const levelChances = chancesTable[this.champSelection.level - 1]
    const champChances = levelChances[threeStar.rarity - 1]
    const rarityBonus = Math.floor(maxRarityScore * ((120 - champChances) / 100))

    const totalScore = Math.floor((timeScore + rarityBonus) * penalize)

    return {
      total: totalScore,
      time: timeScore,
      rarity: rarityBonus,
      penalize: Math.ceil((timeScore + rarityBonus) * (1 - penalize)),
    }
  }

  endGame = () => {
    this.stopListening()
    this.setGameState((prevState: gameStateType) => ({ ...prevState, score: this.calculateScore(), end: true }))
  }

  rgbToHex = (r: number, g: number, b: number) => {
    if (r > 255 || g > 255 || b > 255) throw 'Invalid color component'
    return ((r << 16) | (g << 8) | b).toString(16)
  }

  colorFromPosition = (x: number, y: number) => {
    const hitboxContext = this.hitboxCanvas.getContext('2d') as CanvasRenderingContext2D
    const colorData = hitboxContext.getImageData(x, y, 1, 1).data
    return '#' + ('000000' + this.rgbToHex(colorData[0], colorData[1], colorData[2])).slice(-6)
  }

  handleClick = () => {
    const color = this.colorFromPosition(this.mousePosition.x, this.mousePosition.y)
    const clicked = this.champSelection.hitboxes[color as keyof typeof this.champSelection.hitboxes]
    let notEmpty = false

    if (clicked === undefined) return
    else if (clicked === 'levelup' && this.custom) (this.champSelection.level = this.champSelection.level > 10 ? 11 : this.champSelection.level + 1, notEmpty = true)
    else if (clicked === 'leveldown' && this.custom) (this.champSelection.level = this.champSelection.level < 2 ? 1 : this.champSelection.level - 1, notEmpty = true)
    else if (clicked === 'refresh') (this.champSelection.refreshShop(), notEmpty = true)
    else if (clicked.includes('slot')) {
      notEmpty = this.champSelection.buyChampion(clicked)
      if (!this.endless && !!this.ownThreeStar()) this.endGame()
    } else if (clicked.includes('bench')) notEmpty = this.champSelection.sellChampion(clicked)
    else if (clicked === 'escape') this.cancelGame()

    if (notEmpty) this.champSelection.initialization(this.canvas, this.hitboxCanvas, this.custom)
  }

  toggleTimer = () => {
    if (this.timer.paused) this.updateTimer(parseInt(this.timer.minutes), parseInt(this.timer.seconds), parseInt(this.timer.milliseconds))
    else clearInterval(this.timeUpdate)
    this.timer.paused = !this.timer.paused
  }

  cancelGame = () => {
    this.stopListening()
    this.setGameState((prevState: gameStateType) => ({ ...prevState, start: false, end: false }))
  }

  ownThreeStar = () => {
    return this.champSelection.ownedChamps.find(ownedChamp => ownedChamp && ownedChamp.star === 3)
  }

  handleCursor = () => {
    document.body.style.cursor = 'default'
    const color = this.colorFromPosition(this.mousePosition.x, this.mousePosition.y)

    if (color !== '#000000') {
      const clicked = this.champSelection.hitboxes[color as keyof typeof this.champSelection.hitboxes]
      if (!clicked) document.body.style.cursor = 'default'
      else if (clicked.includes('slot')) {
        const slotClicked = parseInt(clicked.split('slot')[1])
        const champion = this.champSelection.shopChamps[slotClicked]
        if (champion) document.body.style.cursor = 'pointer'
        else document.body.style.cursor = 'default'
      } else if (clicked.includes('bench')) {
        const benchClicked = parseInt(clicked.split('bench')[1])
        const champion = this.champSelection.ownedChamps[benchClicked]
        if (champion) document.body.style.cursor = 'pointer'
        else document.body.style.cursor = 'default'
      } else if (!this.custom && (clicked === 'levelup' || clicked === 'leveldown')) {
        document.body.style.cursor = 'not-allowed'
      } else document.body.style.cursor = 'pointer'
    }
  }

  drawScore = () => {
    const context = this.scoreCanvas.getContext('2d') as CanvasRenderingContext2D
    const hitboxContext = this.hitboxCanvas.getContext('2d') as CanvasRenderingContext2D
    context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    const scoreHeight = 50
    const scoreWidth = 150

    context.save()
    context.beginPath()
    context.lineWidth = 2
    context.strokeStyle = 'black'
    context.rect(this.canvas.width / 2 - scoreWidth / 2, -2, scoreWidth, scoreHeight)
    context.textAlign = 'center'
    context.font = `24px Arial`
    context.fillText(`${this.timer.minutes}:${this.timer.seconds}:${this.timer.milliseconds}`, this.canvas.width / 2, 30)

    context.stroke()
    context.restore()
  }

  draw = () => {
    this.animation = requestAnimationFrame(() => this.draw())

    this.handleCursor()
    this.drawScore()

    const now = Date.now()
    const elapsed = now - this.then
    if (elapsed > this.fpsInterval) {
        this.then = now - (elapsed % this.fpsInterval)

        this.champSelection.drawAnimations(this.animationsCanvas)
    }
  }

  prependZero(time: number, length: number) {
    const stringTime = new String(time)
    return new Array(Math.max(length - stringTime.length + 1, 0)).join('0') + time
  }
  
  updateTimer = (mins: number = 0, secs: number = 0, mills: number = 0) => {
    clearInterval(this.timeUpdate)
    this.timerStart = new Date()

    this.timeUpdate = setInterval(() => {
      const prevTime = mins * 1e3 * 60 + secs * 1e3 + mills % 1e3
      const timeElapsed = new Date().getTime() - this.timerStart.getTime() + prevTime

      var minutes = Math.floor(timeElapsed / 1e3 / 60)
      if (minutes >= 60) minutes %= 60

      var seconds = Math.floor(timeElapsed / 1e3)
      if (seconds >= 60) seconds %= 60

      var milliseconds = timeElapsed % 1e3
      if (milliseconds >= 1e3) milliseconds %= 1e3

      this.timer = {
        paused: false,
        minutes: this.prependZero(minutes, 2),
        seconds: this.prependZero(seconds, 2),
        milliseconds: this.prependZero(milliseconds, 3),
      }
    }, 25)
  }

  start = () => {
    this.updateTimer()
    this.draw()
  }

  pause = () => {
    cancelAnimationFrame(this.animation)
  }
}
