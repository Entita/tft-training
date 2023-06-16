import React from 'react'
import { gameStateType } from './StartingPage'
import { GameSettingsWrapperStyled, GameSettingsTitleStyled, GameSettingsInputWrapperStyled, GameSettingsInputSpanStyled, GameSettingsInputStyled, GameSettingsCheckboxWrapperStyled, GameSettingsCheckboxLabelStyled, GameSettingsCheckboxStyled, GameStartButtonStyled, LeaderboardSettingsOptionStyled, LeaderboardSettingsSelectStyled, LeaderboardSettingsSpanStyled, LeaderboardSettingsWrapperStyled } from './GameSettings.style'

const isGoldValid = (input: any) => {
  const inputNumber = parseInt(input.value)

  if (inputNumber < 0) input.value = 0
  else if (inputNumber > 999) input.value = 999
  else input.value = inputNumber

  return true
}

const isLevelValid = (input: any) => {
  const inputNumber = parseInt(input.value)

  if (inputNumber < 1) input.value = 1
  else if (inputNumber > 11) input.value = 11
  else input.value = inputNumber

  return true
}

export const getLeaderboardSettingsByLevel = (level: number) => {
  return leaderboardSettings.find(leaderboardSetting => leaderboardSetting.level === level) || { level: 1, gold: 0 }
}

const leaderboardSettings = [
  { level: 1, gold: 55 }, { level: 2, gold: 65 }, { level: 3, gold: 80 },
  { level: 4, gold: 90 }, { level: 5, gold: 100 }, { level: 6, gold: 110 },
  { level: 7, gold: 120 }, { level: 8, gold: 130 }, { level: 9, gold: 150 },
  { level: 10, gold: 120 }, { level: 11, gold: 150 }
]

export default function GameSettings({ gameState, setGameState }: { gameState: gameStateType, setGameState: Function }) {
  const [leaderboardSettingsLevel, setLeaderboardSettingsLevel] = React.useState<number>(gameState.level)

  const changeGameSettings = (number: number) => {
    const leaderboardSetting = getLeaderboardSettingsByLevel(number)

    setLeaderboardSettingsLevel(number)
    setGameState((prevState: gameStateType) => ({ ...prevState, level: leaderboardSetting.level, gold: leaderboardSetting.gold, thinkFast: false, endless: false }))
  }

  return (
    <GameSettingsWrapperStyled>
      <GameSettingsTitleStyled>Game settings</GameSettingsTitleStyled>
      <GameSettingsCheckboxWrapperStyled>
        <GameSettingsCheckboxLabelStyled htmlFor='leaderboardSettingsCheckbox'>Leaderboard settings ?</GameSettingsCheckboxLabelStyled>
        <GameSettingsCheckboxStyled id='leaderboardSettingsCheckbox' type='checkbox' defaultChecked={gameState.leaderboardSettings} onChange={({ target }: any) => (setGameState((prevState: gameStateType) => ({ ...prevState, leaderboardSettings: target.checked })), changeGameSettings(leaderboardSettingsLevel))} />
      </GameSettingsCheckboxWrapperStyled>
      <LeaderboardSettingsWrapperStyled>
        <LeaderboardSettingsSpanStyled>Leaderboard settings for level:</LeaderboardSettingsSpanStyled>
        <LeaderboardSettingsSelectStyled disabled={!gameState.leaderboardSettings} onChange={({ target }) => changeGameSettings(parseInt(target.value))}>
          {leaderboardSettings.map((leaderboardSetting, index) =>
            <LeaderboardSettingsOptionStyled key={index} defaultValue={leaderboardSetting.level} selected={leaderboardSetting.level === leaderboardSettingsLevel}>{leaderboardSetting.level}</LeaderboardSettingsOptionStyled>
          )}
        </LeaderboardSettingsSelectStyled>
      </LeaderboardSettingsWrapperStyled>
      <GameSettingsInputWrapperStyled>
        <GameSettingsInputSpanStyled>Starting level:</GameSettingsInputSpanStyled>
        <GameSettingsInputStyled type='number' value={gameState.level} disabled={gameState.leaderboardSettings} onChange={({ target }: any) => isLevelValid(target) && setGameState((prevState: gameStateType) => ({ ...prevState, level: parseInt(target.value) || gameState.level }))} />
      </GameSettingsInputWrapperStyled>
      <GameSettingsInputWrapperStyled>
        <GameSettingsInputSpanStyled>Starting gold:</GameSettingsInputSpanStyled>
        <GameSettingsInputStyled type='number' value={gameState.gold} disabled={gameState.leaderboardSettings} onChange={({ target }: any) => isGoldValid(target) && setGameState((prevState: gameStateType) => ({ ...prevState, gold: parseInt(target.value) || gameState.gold }))} />
      </GameSettingsInputWrapperStyled>
      <GameSettingsCheckboxWrapperStyled>
        <GameSettingsCheckboxLabelStyled htmlFor='thinkFastCheckbox'>Think fast ?</GameSettingsCheckboxLabelStyled>
        <GameSettingsCheckboxStyled id='thinkFastCheckbox' type='checkbox' disabled={gameState.leaderboardSettings} checked={gameState.thinkFast} onChange={({ target }: any) => setGameState((prevState: gameStateType) => ({ ...prevState, thinkFast: target.checked }))} />
      </GameSettingsCheckboxWrapperStyled>
      <GameSettingsCheckboxWrapperStyled>
        <GameSettingsCheckboxLabelStyled htmlFor='endlessCheckbox'>Endless mode ?</GameSettingsCheckboxLabelStyled>
        <GameSettingsCheckboxStyled id='endlessCheckbox' type='checkbox' disabled={gameState.leaderboardSettings} checked={gameState.endless} onChange={({ target }: any) => setGameState((prevState: gameStateType) => ({ ...prevState, endless: target.checked }))} />
      </GameSettingsCheckboxWrapperStyled>
      <GameStartButtonStyled onClick={() => setGameState((prevState: gameStateType) => ({ ...prevState, start: true, end: false }))}>Start game</GameStartButtonStyled>
    </GameSettingsWrapperStyled>
  )
}
