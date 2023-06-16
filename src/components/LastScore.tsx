import React from 'react'
import { LastScoreButtonStyled, LastScoreNameSpanStyled, LastScoreNameStyled, LastScoreNameWrapperStyled, LastScorePenalizeSpanStyled, LastScorePenalizeStyled, LastScorePenalizeWrapperStyled, LastScoreRaritySpanStyled, LastScoreRarityStyled, LastScoreRarityWrapperStyled, LastScoreSpanStyled, LastScoreStyled, LastScoreTimeSpanStyled, LastScoreTimeStyled, LastScoreTimeWrapperStyled, LastScoreWrapperStyled, WrapperStyled } from './LastScore.style'
import { gameStateType } from './StartingPage'

export default function LastScore({ gameState, setGameState }: { gameState: gameStateType, setGameState: Function }) {
  return (
    <WrapperStyled>
      <LastScoreWrapperStyled>
        <LastScoreSpanStyled>Total score:</LastScoreSpanStyled>
        <LastScoreStyled>{gameState.score.total}</LastScoreStyled>
      </LastScoreWrapperStyled>
      <LastScoreTimeWrapperStyled>
        <LastScoreTimeSpanStyled>Time score:</LastScoreTimeSpanStyled>
        <LastScoreTimeStyled>{gameState.score.time}</LastScoreTimeStyled>
      </LastScoreTimeWrapperStyled>
      <LastScoreRarityWrapperStyled>
        <LastScoreRaritySpanStyled>Rarity score:</LastScoreRaritySpanStyled>
        <LastScoreRarityStyled>{gameState.score.rarity}</LastScoreRarityStyled>
      </LastScoreRarityWrapperStyled>
      <LastScorePenalizeWrapperStyled>
        <LastScorePenalizeSpanStyled>Penalty for missed champs:</LastScorePenalizeSpanStyled>
        <LastScorePenalizeStyled>{gameState.score.penalize}</LastScorePenalizeStyled>
      </LastScorePenalizeWrapperStyled>
      <LastScoreNameWrapperStyled>
        <LastScoreNameSpanStyled>Name:</LastScoreNameSpanStyled>
        <LastScoreNameStyled type='input'  />
      </LastScoreNameWrapperStyled>
      <LastScoreButtonStyled>Submit score</LastScoreButtonStyled>
    </WrapperStyled>
  )
}
