import styled from "styled-components";

export const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 3px solid black;
  border-radius: 20px;
  padding: 0.6rem 2rem 1rem 2rem;
  gap: .6rem;
`

export const LeaderboardTitleStyled = styled.h1`
  font-size: 24px;
  letter-spacing: 1px;
  margin: 0;
`

export const LeaderboardTableWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const LeaderboardTablePlayerWrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  overflow-x: hidden;
`

export const LeaderboardTablePlayerNameStyled = styled.span`
  position: relative;

  &::before {
    position: absolute;
    content: '..............................................................................................................................................................................................................................................................................................................................................................................................................................................................................';
    bottom: 0;
    color: gray;
    font-size: 7px;
  }
`

export const LeaderboardTablePlayerScoreStyled = styled.span`
  
`
