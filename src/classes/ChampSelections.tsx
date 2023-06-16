import { ChampionsPool, chancesTable, cloneClass } from "./Champions/ChampionsPool"

type champSelectionProps = {
  gold: number
  level: number
  thinkFast: boolean
}

export class ChampSelections {
  gold: number
  level: number
  thinkFast: boolean
  championsPool: ChampionsPool = new ChampionsPool()
  history: Array<any> = []
  lastShop: Array<any> = []
  shopChamps: Array<any> = []
  ownedChamps: Array<any> = Array(9).fill(null)
  rarityColors = ['#213042', '#156831', '#12407c', '#893088', '#b89d27']
  traits: any = {
    'duelist': 'Duelist',
    'forecaster': 'Forecaster',
    'gadgeteen': 'Gadgeteen',
    'hacker': 'Hacker',
    'heart': 'Heart',
    'infiniteam': 'InfiniTeam',
    'lasercorps': 'Lasercorps',
    'mascot': 'Mascot',
    'mechaprime': 'Mecha:Prime',
    'oxforce': 'Ox Force',
    'parallel': 'Parallel',
    'prankster': 'Prankster',
    'quickdraw': 'Quickdraw',
    'renegade': 'Renegade',
    'riftwalker': 'Riftwalker',
    'spellslinger': 'Spellslinger',
    'starguardian': 'Star Guardian',
    'supers': 'Supers',
    'sureshot': 'Sureshot',
    'threat': 'Threat',
    'underground': 'Underground',
    'animasquad': 'Anima Squad',
    'defender': 'Defender',
    'aegis': 'Aegis',
    'brawler': 'Brawler',
    'ace': 'Ace',
    'admin': 'A.D.M.I.N.',
    'corrupted': 'Corrupted',
  }
  rarityColorsGradient = [
    ['#2d3641', '#3e5066',],
    ['#124924', '#1e8842'],
    ['#0e305e', '#195199'],
    ['#551854', '#a03c9e'],
    ['#75651d', '#caad2d'],
  ]
  hitboxes = {
    '#5cff46': 'escape',
    '#fffb00': 'levelup',
    '#ff9900': 'leveldown',
    '#ff0000': 'refresh',
    '#66ff00': 'slot0',
    '#00ffea': 'slot1',
    '#0400ff': 'slot2',
    '#6f00ff': 'slot3',
    '#ff0080': 'slot4',
    '#00e1ff': 'bench0',
    '#ffc400': 'bench1',
    '#48ff00': 'bench2',
    '#0044ff': 'bench3',
    '#f700ff': 'bench4',
    '#ff0022': 'bench5',
    '#9dff00': 'bench6',
    '#0059ff': 'bench7',
    '#ff6600': 'bench8',
  }
  animatedBorders: any = []
  animatedBackgrounds: any = []

  constructor (props: champSelectionProps) {
    this.gold = props.gold
    this.level = props.level
    this.thinkFast = props.thinkFast

    this.addShopToHistoryAndRefresh()
  }
  
  refreshShop = () => {
    if (this.thinkFast || this.gold > 1) {
      if (!this.thinkFast) this.gold -= 2
      this.addShopToHistoryAndRefresh()
    }
  }

  addShopToHistoryAndRefresh = () => {
    const clonedShop = this.shopChamps.map(shopChamp => shopChamp && ({ ...cloneClass(shopChamp) }))
    this.shopChamps = this.championsPool.getRandomChampions(this.level, 5)

    if (clonedShop.length > 0) this.history.push(this.lastShop.map((shopChamp, index) => ({ ...shopChamp, bought: clonedShop[index] === null })))
    this.lastShop = this.shopChamps.map(shopChamp => ({ ...cloneClass(shopChamp) }))
  }

  getNumberOfOwnedChampions = (shopChampion: any) => {
    const champions = this.ownedChamps.filter(champion => champion?.name === shopChampion.name)
    return champions.reduce((prev, champion) => prev + 3 ** (champion.star - 1), 1)
  }

  drawChamp = (canvas: HTMLCanvasElement, champion: any, hitboxCanvas: HTMLCanvasElement, color: string, coord: { x: number, y: number, width: number, height: number, fontSize: number }) => {
    const context = canvas.getContext('2d') as CanvasRenderingContext2D
    context.save()

    if (champion) {
      const gradient = context.createLinearGradient(coord.x, 0, coord.x + coord.width, 0)
      gradient.addColorStop(0, this.rarityColorsGradient[champion.rarity - 1][0])
      gradient.addColorStop(1, this.rarityColorsGradient[champion.rarity - 1][1])
      
      context.fillStyle = gradient
      context.fillRect(coord.x, coord.y, coord.width, coord.height) // Champ bg

      const numberOfChampions = this.getNumberOfOwnedChampions(champion)
      if (numberOfChampions % 3 === 0) {
        this.animatedBorders.push({
          gradient: {
            color: 'white',
            x: coord.x,
            y: coord.y,
          },
          coord: {
            x: coord.x,
            y: coord.y,
            width: coord.width - 2.5,
            height: coord.height - 2.5,
          },
          lineWidth: 2.5,
        })
        this.animatedBorders.push({
          gradient: {
            color: 'white',
            x: coord.x + coord.width - 2.5,
            y: coord.y + coord.height - 2.5,
          },
          coord: {
            x: coord.x,
            y: coord.y,
            width: coord.width - 2.5,
            height: coord.height - 2.5,
          },
          lineWidth: 2.5,
        })
      }
      if (numberOfChampions > 1)
        this.animatedBackgrounds.push({
          gradient: {
            color: '#ffffff20',
            step: 0,
          },
          coord: {
            x: coord.x,
            y: coord.y,
            width: coord.width,
            height: coord.height,
          },
        })

      const image = new Image()
      image.src = `champions/${this.getChampionName(champion)}.webp`
      image.onload = () => {
        context.drawImage(image, coord.x + 4, coord.y + 4, coord.width - 8, coord.height - coord.fontSize * 2 + 4) // Champion
        context.fillStyle = 'white'
        context.strokeStyle = 'black'
        context.font = `${coord.fontSize}px Arial`
        context.strokeText(`${champion.name.split('').join(String.fromCharCode(8202))}`, coord.x + 5, coord.y + coord.height - 10)
        context.fillText(`${champion.name.split('').join(String.fromCharCode(8202))}`, coord.x + 5, coord.y + coord.height - 10) 

        for (let i = 0; i < champion.traits.length; i++) {
          const trait = champion.traits[champion.traits.length - 1 - i]

          context.beginPath()
          const pentagon = {
            size: 12,
            xCenter: coord.x + 18,
            yCenter: coord.y + coord.height - coord.fontSize * 2 + 20 - 24 * (i + 1),
            step: 2 * Math.PI / 5,
            shift: (Math.PI / 180.0) * - 18,
          }
          for (let i = 0; i < 5; i++) {
            const curStep = i * pentagon.step + pentagon.shift
            context.lineTo(pentagon.xCenter + pentagon.size * Math.cos(curStep), pentagon.yCenter + pentagon.size * Math.sin(curStep))
          }
          context.lineWidth = 1
          context.closePath()
          context.fillStyle = '#3d3d3d'
          context.strokeStyle = '#131313'
          context.fill()
          context.stroke()

          const traitImage = new Image()
          traitImage.src = `traits/${trait}.png`
          traitImage.onload = () => {
            context.drawImage(traitImage, coord.x + 12, coord.y + coord.height - coord.fontSize * 2 + 14 - 24 * (i + 1), 12, 12)
          }

          context.fillStyle = '#dfdfdf'
          context.font = `10px Arial`
          context.fillText(this.traits[trait], coord.x + 32, coord.y + coord.height - coord.fontSize * 2 - 24 * i)
        }

        if (champion.rarity > 1) {
          const rarityFrame = new Image()
          rarityFrame.src = `icons/rarity${champion.rarity}.webp` // Rarity frame
          rarityFrame.onload = () => {
            context.drawImage(rarityFrame, coord.x + coord.width / 6, coord.y, coord.width / 1.5, coord.height / 5)
          }
        }

        const whiteStarImage = new Image()
        whiteStarImage.src = `icons/whiteStar.png`
        whiteStarImage.onload = () => {
          if (numberOfChampions % 3 === 0) {
            const numberOfStars = numberOfChampions % 9 === 0 ? 3 : 2
            for (let i = 0; i < numberOfStars; i++) {
              context.drawImage(whiteStarImage, (coord.x + 4) + (coord.width / 5 - 8) * i, coord.y + 4, coord.width / 5 - 8, coord.width / 5 - 8) // White Stars
            }
          }
        }
      }
      context.beginPath()
      context.strokeStyle = 'black'
      context.lineWidth = 1.25
      context.rect(coord.x, coord.y, coord.width, coord.height) // Black border
      context.stroke()
    } else {
      context.beginPath()
      context.lineWidth = 3
      context.moveTo(coord.x, coord.y)
      context.lineTo(coord.x + coord.width, coord.y)
      context.lineTo(coord.x + coord.width, coord.y + coord.height)
      context.lineTo(coord.x, coord.y + coord.height)
      context.closePath()

      context.strokeStyle = '#112627'
      context.fillStyle = '#020806'
      context.stroke()
      context.fill()

      context.beginPath()
      context.lineWidth = 3
      context.moveTo(coord.x + 12, coord.y + 12)
      context.lineTo(coord.x - 12 + coord.width, coord.y + 12)
      context.lineTo(coord.x - 12 + coord.width, coord.y - 12 + coord.height)
      context.lineTo(coord.x + 12, coord.y - 12 + coord.height)
      context.closePath()

      context.strokeStyle = '#112627'
      context.fillStyle = '#040e0a'
      context.stroke()
      context.fill()
    }

    const hitboxContext = hitboxCanvas.getContext('2d') as CanvasRenderingContext2D
    hitboxContext.save()
    hitboxContext.fillStyle = color
    hitboxContext.fillRect(coord.x, coord.y, coord.width, coord.height)
    hitboxContext.restore()
    context.restore()
  }

  drawButtons = (canvas: HTMLCanvasElement, hitboxCanvas: HTMLCanvasElement, custom: boolean, coord: { x: number, y: number, width: number, height: number, space: number, maxWidth: number, btnHeight: number, fontSize: number }) => {
    const buttonHeight = coord.btnHeight || (coord.height - coord.space) / 2
    const context = canvas.getContext('2d') as CanvasRenderingContext2D
    context.save()
    if (canvas.width < 1000) {
      const levelUpButtonImage = new Image()
      levelUpButtonImage.src = custom ? 'levelup.png' : 'levelup-disabled.png'
      levelUpButtonImage.onload = () => {
        context.drawImage(levelUpButtonImage, coord.x, coord.y + coord.height - buttonHeight, coord.maxWidth / 4, buttonHeight)
      }

      const levelDownButtonImage = new Image()
      levelDownButtonImage.src = custom ? 'leveldown.png' : 'leveldown-disabled.png'
      levelDownButtonImage.onload = () => {
        context.drawImage(levelDownButtonImage, coord.x + coord.maxWidth / 4, coord.y + coord.height - buttonHeight, coord.maxWidth / 4, buttonHeight)
      }

      const refreshButtonImage = new Image()
      refreshButtonImage.src = this.thinkFast ? 'refresh-free.png' : 'refresh.png'
      refreshButtonImage.onload = () => {
        context.drawImage(refreshButtonImage, coord.x + coord.maxWidth / 2 + coord.space, coord.y + coord.height - buttonHeight, coord.maxWidth / 2, buttonHeight)
      }

      const hitboxContext = hitboxCanvas.getContext('2d') as CanvasRenderingContext2D
      hitboxContext.save()
      hitboxContext.fillStyle = this.findKeyByValue(this.hitboxes, 'levelup')
      hitboxContext.fillRect(coord.x, coord.y + coord.height - buttonHeight, coord.maxWidth / 4, buttonHeight)
      hitboxContext.fillStyle = this.findKeyByValue(this.hitboxes, 'leveldown')
      hitboxContext.fillRect(coord.x + coord.maxWidth / 4, coord.y + coord.height - buttonHeight, coord.maxWidth / 4, buttonHeight)
      hitboxContext.fillStyle = this.findKeyByValue(this.hitboxes, 'refresh')
      hitboxContext.fillRect(coord.x + coord.maxWidth / 2 + coord.space, coord.y + coord.height - buttonHeight, coord.maxWidth / 2, buttonHeight)
      hitboxContext.restore()
    } else {
      const levelUpButtonImage = new Image()
      levelUpButtonImage.src = custom ? 'levelup.png' : 'levelup-disabled.png'
      levelUpButtonImage.onload = () => {
        context.drawImage(levelUpButtonImage, coord.x, coord.y, coord.width / 2, buttonHeight)
      }

      const levelDownButtonImage = new Image()
      levelDownButtonImage.src = custom ? 'leveldown.png' : 'leveldown-disabled.png'
      levelDownButtonImage.onload = () => {
        context.drawImage(levelDownButtonImage, coord.x + coord.width / 2, coord.y, coord.width / 2, buttonHeight)
      }

      const refreshButtonImage = new Image()
      refreshButtonImage.src = this.thinkFast ? 'refresh-free.png' : 'refresh.png'
      refreshButtonImage.onload = () => {
        context.drawImage(refreshButtonImage, coord.x, coord.y + buttonHeight + coord.space, coord.width, buttonHeight)
      }

      const hitboxContext = hitboxCanvas.getContext('2d') as CanvasRenderingContext2D
      hitboxContext.save()
      hitboxContext.fillStyle = this.findKeyByValue(this.hitboxes, 'levelup')
      hitboxContext.fillRect(coord.x, coord.y, coord.width / 2, buttonHeight)
      hitboxContext.fillStyle = this.findKeyByValue(this.hitboxes, 'leveldown')
      hitboxContext.fillRect(coord.x + coord.width / 2, coord.y, coord.width / 2, buttonHeight)
      hitboxContext.fillStyle = this.findKeyByValue(this.hitboxes, 'refresh')
      hitboxContext.fillRect(coord.x, coord.y + buttonHeight + coord.space, coord.width, buttonHeight)
      hitboxContext.restore()
    }
    context.restore()
  }

  findKeyByValue = (object: any, value: string) => {
    return Object.keys(object).find(key => object[key as keyof typeof object] === value) || ''
  }

  drawOutline = (canvas: HTMLCanvasElement, coord: { x: number, y: number, width: number, height: number }) => {
    const context = canvas.getContext('2d') as CanvasRenderingContext2D
    context.save()
    context.beginPath()
    context.rect(coord.x, coord.y, coord.width, coord.height)
    context.stroke()
    context.restore()
  }

  drawGold = (canvas: HTMLCanvasElement, coord: { x: number, y: number, fontSize: number, width: number, upperFontSize: number, padding: number}) => {
    const context = canvas.getContext('2d') as CanvasRenderingContext2D
    context.save()
    context.fillStyle = '#cecfbe'
    context.font = `${coord.fontSize}px Arial`
    const goldImage = new Image()
    goldImage.src = 'gold.png'
    if (canvas.width < 1000) {
      context.fillText(String(this.gold), coord.x + coord.width / 2 - coord.upperFontSize * 2.75 - this.gold.toString().length * 10 - coord.padding + 16, coord.y - 5)
      goldImage.onload = () => {
        context.drawImage(goldImage, coord.x + coord.width / 2 - coord.upperFontSize * 2.75 - this.gold.toString().length * 10 - coord.padding, coord.y - 18)
      }
    }
    else {
      context.fillText(String(this.gold), coord.x + 40, coord.y - 5)
      goldImage.onload = () => {
        context.drawImage(goldImage, coord.x + 25, coord.y - 18)
      }
    }
    context.restore()
  }

  drawLevel = (canvas: HTMLCanvasElement, coord: { x: number, y: number, fontSize: number }) => {
    const context = canvas.getContext('2d') as CanvasRenderingContext2D
    context.save()
    context.fillStyle = '#cecfbe'
    context.font = `${coord.fontSize}px Arial`
    context.fillText(`Lvl. ${this.level}`, coord.x, coord.y)
    context.restore()
  }

  drawChances = (canvas: HTMLCanvasElement, coord: { x: number, y: number, space: number, fontSize: number }) => {
    const context = canvas.getContext('2d') as CanvasRenderingContext2D
    context.save()
    context.font = `${coord.fontSize}px Arial`
    for (let i = 0; i < this.rarityColors.length; i++) {
      context.fillStyle = this.rarityColors[i]
      context.fillText(`• ${chancesTable[this.level - 1][i]}%`, coord.x + (coord.fontSize + coord.space) * i, coord.y)
    }
    context.restore()
  }

  drawBackground = (canvas: HTMLCanvasElement, coord: { x: number, y: number, width: number, height: number, elevation: number, upperWidth: number, upperMid: number, upperFontSize: number, padding: number, buttonWidth: number }) => {
    const context = canvas.getContext('2d') as CanvasRenderingContext2D
    const gradientStroke = context.createLinearGradient(coord.x, coord.y - coord.elevation, coord.x, coord.y + coord.height)
    gradientStroke.addColorStop(0, '#927943')
    gradientStroke.addColorStop(0.8, '#6e582f')
    gradientStroke.addColorStop(1, 'black')
    context.save()

    context.beginPath()

    context.moveTo(coord.x, coord.y - coord.elevation + 10)
    context.lineTo(coord.x + coord.upperWidth - 12, coord.y - coord.elevation + 10)
    context.lineTo(coord.x + coord.upperWidth + 12, coord.y)
    context.lineTo(coord.x, coord.y)
    context.closePath()
    context.fillStyle = 'rgba(0, 0, 0, .55)'
    context.fill()

    context.beginPath()
    if (canvas.width < 1000) {
      context.moveTo(coord.x, coord.y - coord.elevation)
      context.lineTo(coord.x + 90, coord.y - coord.elevation)
      context.lineTo(coord.x + 110, coord.y)
    } else {
      context.moveTo(coord.x, coord.y - coord.elevation)
      context.lineTo(coord.x + coord.buttonWidth - 40, coord.y - coord.elevation)
      context.lineTo(coord.x + coord.buttonWidth, coord.y)
    }
    context.lineTo(coord.x + coord.width, coord.y)
    context.lineTo(coord.x + coord.width, coord.y + coord.height)
    context.lineTo(coord.x, coord.y + coord.height)

    context.closePath()
    context.lineWidth = 10
    context.strokeStyle = gradientStroke
    context.fillStyle = '#0e1819'
    context.stroke()
    context.fill()

    context.beginPath()
    if (canvas.width < 1000) {
      context.moveTo(coord.x + coord.width - 140, coord.y - coord.elevation)
      context.lineTo(coord.x + coord.width, coord.y - coord.elevation)
      context.lineTo(coord.x + coord.width, coord.y - 5)
      context.lineTo(coord.x + coord.width - 160, coord.y - 5)
    } else {
      context.moveTo(canvas.width / 2 - coord.x, coord.y - 5)
      context.lineTo(canvas.width / 2 - coord.x + 20, coord.y - coord.elevation)
      context.lineTo(canvas.width / 2 - coord.x + 140, coord.y - coord.elevation)
      context.lineTo(canvas.width / 2 - coord.x + 160, coord.y - 5)
    }
    context.closePath()
    context.lineWidth = 10
    context.strokeStyle = gradientStroke
    context.fillStyle = '#061610'
    context.stroke()
    context.fill()

    context.restore()
  }

  getChampionName = (champion: any) => {
    return champion.name.toLowerCase().replace(' ', '').replace('-', '').replace('\'', '')
  }

  drawBench = (canvas: HTMLCanvasElement, champion: any, hitboxCanvas: HTMLCanvasElement, hitboxColor: string, coord: { x: number, y: number, width: number, height: number, fontSize: number }) => {
    const context = canvas.getContext('2d') as CanvasRenderingContext2D
    const hitboxContext = hitboxCanvas.getContext('2d') as CanvasRenderingContext2D
    context.save()

    if (champion) {
      const image = new Image()
      image.src = `icons/${this.getChampionName(champion)}.webp`
      image.onload = () => {
        context.fillStyle = this.rarityColors[champion.rarity - 1]
        context.fillRect(coord.x, coord.y, coord.width, coord.height)
        context.drawImage(image, coord.x + 4, coord.y + 4, coord.width - 8, coord.height - 8)
        context.fillStyle = 'white'
        context.strokeStyle = 'black'
        context.font = `${coord.fontSize}px Arial`
        context.strokeText(`${champion.name.split('').join(String.fromCharCode(8202))}`, coord.x + 5, coord.y + coord.height - 10)
        context.fillText(`${champion.name.split('').join(String.fromCharCode(8202))}`, coord.x + 5, coord.y + coord.height - 10)

        const starImage = new Image()
        starImage.src = `icons/star.png`
        starImage.onload = () => {
          for (let i = 0; i < champion.star; i++) {
            context.drawImage(starImage, coord.x + (coord.width / 5) * i + 4, coord.y + 4, (coord.width / 5) - 8, (coord.height / 5) - 8)
          }
        }
      }
    }

    context.strokeStyle = 'black'
    context.lineWidth = 1
    context.rect(coord.x, coord.y, coord.width, coord.height)
    
    hitboxContext.fillStyle = hitboxColor
    hitboxContext.fillRect(coord.x, coord.y, coord.width, coord.height)
    context.stroke()
    context.restore()
  }

  drawEsc = (canvas: HTMLCanvasElement, hitboxCanvas: HTMLCanvasElement) => {
    const context = canvas.getContext('2d') as CanvasRenderingContext2D
    const hitboxContext = hitboxCanvas.getContext('2d') as CanvasRenderingContext2D
    const coord = {
      x: 6,
      y: 3,
      width: 70,
      height: 40,
      border: 4,
      rounded: 8
    }

    context.save()
    context.fillStyle = '#ff4444'
    context.roundRect(coord.x, coord.y, coord.width, coord.height, coord.rounded)
    context.roundRect(coord.x + coord.border, coord.y + coord.border, coord.width - coord.border * 2, coord.height - coord.border * 2, coord.rounded / 2)
    context.fill()
    context.fillStyle = '#ffcece'
    context.font = `18px Arial`
    context.textAlign = 'center'
    context.fillText('Esc', coord.x + coord.width / 2, coord.y + coord.height / 2 + 4.5)
    
    hitboxContext.fillStyle = this.findKeyByValue(this.hitboxes, 'escape')
    hitboxContext.roundRect(coord.x, coord.y, coord.width, coord.height, coord.rounded)
    
    context.stroke()
    hitboxContext.fill()
    context.restore()
  }

  initialization = (canvas: HTMLCanvasElement, hitboxCanvas: HTMLCanvasElement, custom: boolean) => {
    const context = canvas.getContext('2d') as CanvasRenderingContext2D
    const hitboxContext = hitboxCanvas.getContext('2d', { willReadFrequently: true }) as CanvasRenderingContext2D
    context.clearRect(0, 0, window.innerWidth, window.innerHeight)
    hitboxContext.clearRect(0, 0, window.innerWidth, window.innerHeight)
    this.animatedBorders = []
    this.animatedBackgrounds = []

    let champSpace = 10
    let champFontSize = 21
    let padding = 10
    let selectionSpaceX = 20
    let buttonSpace = 10
    let buttonWidth = canvas.width / 5
    let champSize = ((canvas.width - selectionSpaceX * 2) - buttonWidth - buttonSpace - padding) / 5 - champSpace * .8
    let selectionSpaceY = canvas.height - champSize
    let buttonElevation = 0
    let buttonSpaceY = 0
    let champElevation = 0
    const buttonFontSize = 18
    const chancesSpace = 40
    const chancesFontSize = 16
    const goldFontSize = 30
    const upperElevation = 8
    const benchSpaceX = 50
    const benchSpaceY = 20
    let benchFontSize = 14
    if (canvas.width < 1400) benchFontSize = 12
    if (canvas.width < 1200) champFontSize = 17
    if (canvas.width < 800) champFontSize = 13
    if (canvas.width < 1000) {
      buttonWidth = 0
      buttonSpaceY = buttonSpace
      buttonElevation = 100
      benchFontSize = 10
      champElevation = 200
      champSize= ((canvas.width - selectionSpaceX * 2) - buttonWidth - buttonSpace - padding) / 5 - champSpace * .8
      selectionSpaceY = canvas.height - champSize - 20
    }

    const coords = {
      x: buttonWidth + selectionSpaceX + buttonSpace,
      y: buttonElevation - buttonSpaceY + selectionSpaceY,
      width: canvas.width - selectionSpaceX * 2,
      height: champSize,
    }
    const benchSizeSquare = (canvas.width - benchSpaceX * 2) / 9

    this.drawEsc(canvas, hitboxCanvas)
    this.drawBackground(canvas, { x: selectionSpaceX, y: selectionSpaceY - buttonElevation - buttonSpaceY, width: coords.width, height: coords.height + buttonElevation + buttonSpaceY, elevation: upperElevation + goldFontSize, upperWidth: buttonWidth + buttonSpace + (chancesFontSize + chancesSpace) * 5 + buttonElevation, upperMid: selectionSpaceX + coords.width / 2, upperFontSize: goldFontSize, padding, buttonWidth: buttonWidth + padding })
    this.drawGold(canvas, { x: selectionSpaceX + coords.width / 2, y: selectionSpaceY - buttonElevation - buttonSpaceY - upperElevation, fontSize: goldFontSize, width: coords.width, upperFontSize: goldFontSize, padding })
    this.drawLevel(canvas, { x: selectionSpaceX + padding, y: selectionSpaceY - buttonElevation - buttonSpaceY - upperElevation, fontSize: goldFontSize })
    this.drawChances(canvas, { x: selectionSpaceX + buttonWidth + buttonSpace + buttonElevation, y: selectionSpaceY - buttonElevation - buttonSpaceY - upperElevation, fontSize: chancesFontSize, space: chancesSpace })
    this.drawButtons(canvas, hitboxCanvas, custom, { x: selectionSpaceX + padding, y: selectionSpaceY + padding, width: buttonWidth - padding, height: coords.height - padding * 2, space: buttonSpace, maxWidth: coords.width - buttonSpace - padding * 2, btnHeight: buttonElevation, fontSize: buttonFontSize })
    
    for (let i = 0; i < 9; i++) {
      const champion = this.ownedChamps[i]
      const hitboxColor = this.findKeyByValue(this.hitboxes, `bench${i}`)
      this.drawBench(canvas, champion, hitboxCanvas, hitboxColor, { x: benchSpaceX + i * benchSizeSquare, y: selectionSpaceY - buttonElevation - buttonSpaceY - upperElevation - goldFontSize - benchSizeSquare - benchSpaceY, width: benchSizeSquare, height: benchSizeSquare, fontSize: benchFontSize })
    }
    for (let i = 0; i < 5; i++) {
      const champion = this.shopChamps[i]
      const hitboxColor = this.findKeyByValue(this.hitboxes, `slot${i}`)
      
      this.drawChamp(
        canvas,
        champion,
        hitboxCanvas,
        hitboxColor,
        {
          x: coords.x + (i * champSize) + (i * champSpace),
          y: coords.y + padding - champElevation,
          width: champSize,
          height: champSize - padding * 2,
          fontSize: champFontSize,
      })
    }
  }

  sellChampion = (clicked: string) => {
    const slotClicked = parseInt(clicked.split('bench')[1])
    const clickedChampion = this.ownedChamps[slotClicked]
    if (!clickedChampion) return false

    this.ownedChamps[slotClicked] = null
    this.gold += (3 ** (clickedChampion.star - 1)) * clickedChampion.rarity
    this.championsPool.addChampionBackToPool(clickedChampion)

    return true
  }

  private buyChampFromShop = (champion: any, shopSlot: number, benchSlot: number) => {
    this.shopChamps[shopSlot] = null
    this.ownedChamps[benchSlot] = champion
    this.championsPool.pool[champion.rarity - 1] = this.championsPool.pool[champion.rarity - 1].filter(poolChampion => poolChampion.id !== champion.id)
    this.gold -= champion.rarity
  }

  buyChampion = (clicked: string) => {
    const slotClicked = parseInt(clicked.split('slot')[1])
    const clickedChampion = this.shopChamps[slotClicked]
    if (!clickedChampion) return false

    const champions = this.ownedChamps.filter(champion => champion?.name === clickedChampion?.name)
    const numberOfChampions = champions.reduce((prev, champion) => prev + 3 ** (champion.star - 1), 1)

    if (this.gold >= clickedChampion.rarity) {
      if (numberOfChampions % 9 === 0) {
        const sameChampionsOneStars = champions.filter(champion => champion.star === 1)
        const sameChampionsTwoStars = champions.filter(champion => champion.star === 2)
        const sameChampions = [...sameChampionsOneStars, ...sameChampionsTwoStars]
        const sameChampionBenchIndexes = sameChampions.map(champion => this.ownedChamps.indexOf(champion)).sort((a, b) => a - b)
        
        sameChampionBenchIndexes.forEach(index => this.ownedChamps[index] = null)
        clickedChampion.star = 3
        this.buyChampFromShop(clickedChampion, slotClicked, sameChampionBenchIndexes[0])
      } else if (numberOfChampions % 3 === 0) {
        const sameChampions = champions.filter(champion => champion.star === 1)
        const sameChampionBenchIndexes = sameChampions.map(champion => this.ownedChamps.indexOf(champion)).sort((a, b) => a - b)
        
        sameChampionBenchIndexes.forEach(index => this.ownedChamps[index] = null)
        clickedChampion.star = 2
        this.buyChampFromShop(clickedChampion, slotClicked, sameChampionBenchIndexes[0])
      } else {
        const getNextEmptyBenchSlot = this.ownedChamps.findIndex(champion => champion === null)
        if (getNextEmptyBenchSlot !== -1) this.buyChampFromShop(clickedChampion, slotClicked, getNextEmptyBenchSlot)
      }
    }

    return true
  }

  roundUpNumber = (number: number, roundTo: number = 1e4) => {
    return Math.floor(number * roundTo) / roundTo
  }

  drawAnimations = (animationsCanvas: HTMLCanvasElement) => {
    const context = animationsCanvas.getContext('2d') as CanvasRenderingContext2D
    context.clearRect(0, 0, window.innerWidth, window.innerHeight)

    context.save()
    this.animatedBorders.forEach((animation: any) => {
      context.beginPath()
      const lineWidth = 2.5
      const width = animation.coord.width / 3
      const speedStep = Math.floor(Date.now() / 500) % 4 < 2 ? 3 : 5
      const topDynamic = animation.gradient.y
      const leftDynamic = animation.gradient.x
      const top = animation.coord.y
      const bottom = animation.coord.y + animation.coord.height
      const left = animation.coord.x
      const right = animation.coord.x + animation.coord.width
      const horizontal = topDynamic === top || topDynamic === bottom
      const vertical = !horizontal
      let oneLineToX, oneLineToY, twoLineToX, twoLineToY

      if (topDynamic !== bottom && horizontal) {
        if (leftDynamic + width < right) {
          oneLineToX = leftDynamic
          oneLineToY = top
          twoLineToX = leftDynamic + width
          twoLineToY = top
        } else {
          oneLineToX = right
          oneLineToY = top
          twoLineToX = right
          twoLineToY = top + (leftDynamic + width - right)
        }
      } else if (leftDynamic === right && vertical) {
        if (topDynamic + width < bottom) {
          oneLineToX = leftDynamic
          oneLineToY = topDynamic
          twoLineToX = leftDynamic
          twoLineToY = topDynamic + width
        } else {
          oneLineToX = right
          oneLineToY = bottom
          twoLineToX = right - (topDynamic + width - bottom)
          twoLineToY = bottom
        }
      } else if (topDynamic === bottom && horizontal) {
        if (leftDynamic - width > left) {
          oneLineToX = leftDynamic - width
          oneLineToY = bottom
          twoLineToX = leftDynamic
          twoLineToY = bottom
        } else {
          oneLineToX = left
          oneLineToY = bottom
          twoLineToX = left
          twoLineToY = bottom - (left - leftDynamic + width)
        }
      } else {
        if (topDynamic - width > top) {
          oneLineToX = left
          oneLineToY = topDynamic
          twoLineToX = left
          twoLineToY = topDynamic - width
        } else {
          oneLineToX = left
          oneLineToY = top
          twoLineToX = left + (top - topDynamic + width)
          twoLineToY = top
        }
      }

      context.lineWidth = lineWidth
      context.strokeStyle = 'white'
      context.moveTo(animation.gradient.x, animation.gradient.y)
      context.lineTo(oneLineToX, oneLineToY)
      context.lineTo(twoLineToX, twoLineToY)
      context.stroke()

      if (horizontal) {
        if (leftDynamic === left && topDynamic !== top) animation.gradient.y -= speedStep
        if (leftDynamic === right && topDynamic !== bottom) animation.gradient.y += speedStep
        else if (topDynamic === top) animation.gradient.x += speedStep
        else animation.gradient.x -= speedStep
      } else {
        if (topDynamic === bottom) animation.gradient.x -= speedStep
        else if (leftDynamic === right) animation.gradient.y += speedStep
        else animation.gradient.y -= speedStep
      }

      if (leftDynamic > right) animation.gradient.x = right
      if (leftDynamic < left) animation.gradient.x = left
      if (topDynamic > bottom) animation.gradient.y = bottom
      if (topDynamic < top) animation.gradient.y = top
    })

    this.animatedBackgrounds.forEach((animation: any) => {
      const animatedGradient = context.createLinearGradient(
      animation.coord.x,
      animation.coord.y,
      animation.coord.x + animation.coord.width,
      animation.coord.y + animation.coord.height,
      )

      let firstStop = animation.gradient.step
      let secondStop = this.roundUpNumber(animation.gradient.step + .4)
      let thirdStop = this.roundUpNumber(animation.gradient.step + .4 * 2)

      if (thirdStop > 1) {
        if (secondStop > 1) secondStop = this.roundUpNumber(secondStop - 1)
        thirdStop = this.roundUpNumber(thirdStop - 1)
      }
      if (firstStop >= 1) {
        firstStop = 1
        animation.gradient.step = 0
      }

      animatedGradient.addColorStop(0, 'transparent')
      animatedGradient.addColorStop(firstStop, 'transparent')
      animatedGradient.addColorStop(secondStop, animation.gradient.color)
      animatedGradient.addColorStop(thirdStop, 'transparent')
      animatedGradient.addColorStop(1, 'transparent')
      
      context.beginPath()
      context.fillStyle = animatedGradient
      context.fillRect(
        animation.coord.x,
        animation.coord.y,
        animation.coord.width,
        animation.coord.height,
      )
      animation.gradient.step = this.roundUpNumber(animation.gradient.step + 0.01)
    })

    context.restore()
  }
}