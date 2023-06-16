import React from 'react'
import { WrapperStyled } from './StartingPage.style'
import GameComponent from './GameComponent'
import Menu from './Menu'
import { getLeaderboardSettingsByLevel } from './GameSettings'

export type gameStateType = {
  start: boolean,
  end: boolean,
  gold: number,
  level: number,
  thinkFast: boolean,
  score: {
    total: number,
    time: number,
    rarity: number,
    penalize: number,
  },
  leaderboardSettings: boolean,
  endless: boolean,
}

export const StartingPage = () => {
  const [gameState, setGameState] = React.useState<gameStateType>({
    start: false,
    end: false,
    level: 1,
    gold: getLeaderboardSettingsByLevel(1).gold,
    thinkFast: false,
    score: {
      total: 0,
      time: 0,
      rarity: 0,
      penalize: 0,
    },
    leaderboardSettings: true,
    endless: false,
  })

  return (
    <WrapperStyled>
      {!gameState.start || gameState.end
      ? <Menu gameState={gameState} setGameState={setGameState} />
      : <GameComponent gameState={gameState} setGameState={setGameState} />}
    </WrapperStyled>
  )
}
