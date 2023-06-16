import React from 'react'
import { LeaderboardTableWrapperStyled, LeaderboardTablePlayerNameStyled, LeaderboardTablePlayerScoreStyled, LeaderboardTitleStyled, WrapperStyled, LeaderboardTablePlayerWrapperStyled } from './Leaderboard.style'

export default function Leaderboard() {
  const top10Players = [
    {
      name: 'Ivan',
      score: 9873,
    },
    {
      name: 'Matouš',
      score: 9473,
    },
    {
      name: 'Jan',
      score: 7873,
    },
    {
      name: 'Jacob',
      score: 7673,
    },
    {
      name: 'Destroyer',
      score: 6273,
    },
    {
      name: 'Buddha',
      score: 4373,
    },
    {
      name: 'YaMom',
      score: 2373,
    },
    {
      name: 'xKillerx',
      score: 1573,
    },
    {
      name: 'Gamer',
      score: 873,
    },
    {
      name: 'Bro',
      score: 8,
    },
  ]

  return (
    <WrapperStyled>
      <LeaderboardTitleStyled>Leaderboard</LeaderboardTitleStyled>
      <LeaderboardTableWrapperStyled>
        {top10Players.map((player, index) =>
          <LeaderboardTablePlayerWrapperStyled key={index}>
            <LeaderboardTablePlayerNameStyled>{player.name}</LeaderboardTablePlayerNameStyled>
            <LeaderboardTablePlayerScoreStyled>{player.score}</LeaderboardTablePlayerScoreStyled>
          </LeaderboardTablePlayerWrapperStyled>
        )}
      </LeaderboardTableWrapperStyled>
    </WrapperStyled>
  )
}
