import styled from "styled-components";

export const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 3px solid black;
  border-radius: 20px;
  padding: 0.6rem 2rem 1rem 2rem;
`

export const LastScoreWrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
`

export const LastScoreSpanStyled = styled.span`
  font-size: 18px;
  letter-spacing: 2px;
`

export const LastScoreStyled = styled.span`
  font-weight: bold;
  font-size: 32px;
  text-decoration: underline;
`

export const LastScoreNameWrapperStyled = styled.div`
  display: flex;
  gap: 1rem;
`

export const LastScoreNameSpanStyled = styled.span`
  
`

export const LastScoreNameStyled = styled.input`
  
`

export const LastScoreTimeWrapperStyled = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

export const LastScoreTimeSpanStyled = styled.span`
  
`

export const LastScoreTimeStyled = styled.span`
  color: green;
`

export const LastScoreRarityWrapperStyled = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

export const LastScoreRaritySpanStyled = styled.span`
  
`

export const LastScoreRarityStyled = styled.span`
  color: green;
`

export const LastScorePenalizeWrapperStyled = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

export const LastScorePenalizeSpanStyled = styled.span`
  
`

export const LastScorePenalizeStyled = styled.span`
  color: red;
`

export const LastScoreButtonStyled = styled.button`
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
