import React from 'react'
import { gameStateType } from './StartingPage'
import { Game } from '@/classes/Game'
import { GameCanvasWrapperStyled, GameCanvasStyled } from './GameComponent.style'

export default function GameComponent({ gameState, setGameState }: { gameState: gameStateType, setGameState: Function }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    if (canvasRef == null || !gameState.start || gameState.end) return

    const game = new Game({ canvas: canvasRef.current as HTMLCanvasElement, gameState, setGameState })

    game.start()
    console.log(game)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState, canvasRef])

  return (
    <GameCanvasWrapperStyled id='canvasContainer'>
      <GameCanvasStyled ref={canvasRef} />
    </GameCanvasWrapperStyled>
  )
}
