import styled from "styled-components";

export const GameSettingsWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border: 3px solid black;
  border-radius: 20px;
  padding: .6rem 2rem 1rem 2rem;
`

export const LeaderboardSettingsWrapperStyled = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

export const LeaderboardSettingsSpanStyled = styled.span`
  
`

export const LeaderboardSettingsSelectStyled = styled.select`
  
`

export const LeaderboardSettingsOptionStyled = styled.option`
  
`

export const GameSettingsTitleStyled = styled.h1`
  text-transform: uppercase;
  font-size: 28px;
  letter-spacing: 2px;
  margin: 0;
`

export const GameSettingsInputWrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 1rem;
`

export const GameSettingsInputSpanStyled = styled.span`
  
`

export const GameSettingsInputStyled = styled.input`
  
`

export const GameSettingsCheckboxWrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

export const GameSettingsCheckboxLabelStyled = styled.label`
  letter-spacing: 1px;
`

export const GameSettingsCheckboxStyled = styled.input<{ disabled?: boolean }>`
  cursor: ${({ disabled }) => disabled ? 'default' : 'pointer'};
`

export const GameStartButtonStyled = styled.button`
  width: 100%;
  border-radius: 4px;
  background-color: black;
  color: whitesmoke;
  border: unset;
  padding: 6px 12px;
  font-weight: bold;
  letter-spacing: 2px;
  transition: all .2s ease;

  &:hover {
    background-color: #2c2c2c;
  }

  &:active {
    background-color: gray;
  }
`
