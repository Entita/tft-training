import React from 'react'
import { MenuWrapperStyled } from './Menu.style'
import { gameStateType } from './StartingPage'
import GameSettings from './GameSettings'
import LastScore from './LastScore'
import Leaderboard from './Leaderboard'

export default function Menu({ gameState, setGameState }: { gameState: gameStateType, setGameState: Function }) {
  return (
    <MenuWrapperStyled>
      {gameState.end && <Leaderboard />}
      <GameSettings gameState={gameState} setGameState={setGameState} />
      {gameState.end && <LastScore gameState={gameState} setGameState={setGameState} />}
    </MenuWrapperStyled>
  )
}
