import { Champion } from "./Champion";
import { Fiddlesticks } from "./FiveStar/Fiddlesticks";
import { Janna } from "./FiveStar/Janna";
import { Leona } from "./FiveStar/Leona";
import { Mordekaiser } from "./FiveStar/Mordekaiser";
import { Nunu } from "./FiveStar/Nunu";
import { Syndra } from "./FiveStar/Syndra";
import { UltimateEzreal } from "./FiveStar/UltimateEzreal";
import { Urgot } from "./FiveStar/Urgot";
import { Aatrox } from "./FourStar/Aatrox";
import { AurelionSol } from "./FourStar/AurelionSol";
import { BelVeth } from "./FourStar/BelVeth";
import { Ekko } from "./FourStar/Ekko";
import { Garen } from "./FourStar/Garen";
import { Jhin } from "./FourStar/Jhin";
import { MissFortune } from "./FourStar/MissFortune";
import { Neeko } from "./FourStar/Neeko";
import { Samira } from "./FourStar/Samira";
import { TwistedFate } from "./FourStar/TwistedFate";
import { Viego } from "./FourStar/Viego";
import { Warwick } from "./FourStar/Warwick";
import { Ashe } from "./OneStar/Ashe";
import { Blitzcrank } from "./OneStar/Blitzcrank";
import { Gangplank } from "./OneStar/Gangplank";
import { Kayle } from "./OneStar/Kayle";
import { Lucian } from "./OneStar/Lucian";
import { Lulu } from "./OneStar/Lulu";
import { Lux } from "./OneStar/Lux";
import { Nasus } from "./OneStar/Nasus";
import { Pantheon } from "./OneStar/Pantheon";
import { Poppy } from "./OneStar/Poppy";
import { Renekton } from "./OneStar/Renekton";
import { Sylas } from "./OneStar/Sylas";
import { Wukong } from "./OneStar/Wukong";
import { Alistar } from "./ThreeStar/Alistar";
import { Gnar } from "./ThreeStar/Gnar";
import { Jax } from "./ThreeStar/Jax";
import { Kaisa } from "./ThreeStar/Kaisa";
import { LeBlanc } from "./ThreeStar/LeBlanc";
import { Morgana } from "./ThreeStar/Morgana";
import { Nilah } from "./ThreeStar/Nilah";
import { Rammus } from "./ThreeStar/Rammus";
import { Riven } from "./ThreeStar/Riven";
import { Shen } from "./ThreeStar/Shen";
import { Sona } from "./ThreeStar/Sona";
import { Vayne } from "./ThreeStar/Vayne";
import { Vex } from "./ThreeStar/Vex";
import { Annie } from "./TwoStar/Annie";
import { Camille } from "./TwoStar/Camille";
import { Draven } from "./TwoStar/Draven";
import { Ezreal } from "./TwoStar/Ezreal";
import { Fiora } from "./TwoStar/Fiora";
import { Jinx } from "./TwoStar/Jinx";
import { LeeSin } from "./TwoStar/LeeSin";
import { Malphite } from "./TwoStar/Malphite";
import { Pyke } from "./TwoStar/Pyke";
import { Rell } from "./TwoStar/Rell";
import { Sivir } from "./TwoStar/Sivir";
import { Vi } from "./TwoStar/Vi";
import { Yasuo } from "./TwoStar/Yasuo";

export const cloneClass = (classToClone: any) => {
  const clonedClass = Object.assign(Object.create(Object.getPrototypeOf(classToClone)), classToClone)
  clonedClass.newId()
  return clonedClass
}

export const chancesTable = [
  [100, 0, 0, 0, 0],
  [100, 0, 0, 0, 0],
  [75, 25, 0, 0 ,0],
  [55, 30, 15, 0, 0],
  [45, 33, 20, 2, 0],
  [25, 40, 30, 5, 0],
  [19, 30, 35, 15, 1],
  [16, 20, 35, 25, 4],
  [9, 15, 30, 30, 16],
  [5, 10, 20, 40, 25],
  [1, 2, 12, 50, 35],
]

export class ChampionsPool {
  oneStarChampions: Array<Champion> = [new Ashe(), new Blitzcrank(), new Gangplank(), new Kayle(), new Lucian(), new Lulu(), new Lux(), new Nasus(), new Pantheon(), new Poppy(), new Renekton(), new Sylas(), new Wukong()]
  twoStarChampions: Array<Champion> = [new Annie(), new Camille(), new Draven(), new Ezreal(), new Fiora(), new Jinx(), new LeeSin(), new Malphite(), new Pyke(), new Rell(), new Sivir(), new Vi(), new Yasuo()]
  threeStarChampions: Array<Champion> = [new Alistar(), new Gnar(), new Jax(), new Kaisa(), new LeBlanc(), new Morgana(), new Nilah(), new Rammus(), new Riven(), new Shen(), new Sona(), new Vayne(), new Vex()]
  fourStarChampions: Array<Champion> = [new Aatrox(), new AurelionSol(), new BelVeth(), new Ekko(), new Garen(), new Jhin(), new MissFortune(), new Neeko(), new Samira(), new TwistedFate(), new Viego(), new Warwick()]
  fiveStarChampions: Array<Champion> = [new Fiddlesticks(), new Janna(), new Leona(), new Mordekaiser(), new Nunu(), new Syndra(), new UltimateEzreal(), new Urgot()]

  oneStarPoolChampions: Array<Champion> = [...this.oneStarChampions.flatMap(champion => Array.from({ length: 29 }, e => cloneClass(champion)))]
  twoStarPoolChampions: Array<Champion> = [...this.twoStarChampions.flatMap(champion => Array.from({ length: 22 }, e => cloneClass(champion)))]
  threeStarPoolChampions: Array<Champion> = [...this.threeStarChampions.flatMap(champion => Array.from({ length: 18 }, e => cloneClass(champion)))]
  fourStarPoolChampions: Array<Champion> = [...this.fourStarChampions.flatMap(champion => Array.from({ length: 12 }, e => cloneClass(champion)))]
  fiveStarPoolChampions: Array<Champion> = [...this.fiveStarChampions.flatMap(champion => Array.from({ length: 10 }, e => cloneClass(champion)))]
  pool: Array<Array<Champion>> = [
    this.oneStarPoolChampions,
    this.twoStarPoolChampions,
    this.threeStarPoolChampions,
    this.fourStarPoolChampions,
    this.fiveStarPoolChampions,
  ]

  addChampionBackToPool = (champion: any) => {
    const numberOfChampions = 3 ** (champion.star - 1)
    champion.star = 1
    const championsToAdd = Array.from({ length: numberOfChampions }, e => cloneClass(champion))

    this.pool[champion.rarity - 1].push(...championsToAdd)
  }
  
  getStarFromChances = (chances: Array<number>) => {
    const randomRoll = Math.random() * 1e2
    let chance = 0
    for (let i = chances.length - 1; i >= 0; i--) {
      chance += chances[i]
      if (randomRoll <= chance) return i
    }
  }
  
  getRandomChampions = (level: number, numberOfChampions: number) => {
    const champions: any = []
    for (let i = 0; i < numberOfChampions; i++) {
      const chances = chancesTable[level - 1]
      const star = this.getStarFromChances(chances) as number
      let champion = this.pool[star][Math.floor(Math.random() * this.pool[star].length)]
      while (champions.find((foundChampion: any) => foundChampion.id === champion.id)) {
        champion = this.pool[star][Math.floor(Math.random() * this.pool[star].length)]
      }
      champions.push(champion)
    }

    return champions
  }
}
