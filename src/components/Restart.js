import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { reInitialData } from '../data';
import { useTimer } from '../hooks/TimeDuration';
import VictoryModal from './VictoryModal';

function Restart({
  setCardsToArrange,
  setGoalCards,
  setPickPileCards,
  cardsToArrange,
  pickPileCards,
}) {
  const { setSeconds, duration } = useTimer();
  const [gameDuration, setGameDuration] = useState('');
  useEffect(() => {
    if (cardsToArrange.flat().length === 0 && pickPileCards.length === 0) {
      setGameDuration(duration);
    }
  }, [cardsToArrange, pickPileCards, setGameDuration]);

  return (
    <>
      <Container>
        <p>Time : {duration}</p>
        <button
          onClick={() => {
            setSeconds(0);
            reInitialData(setCardsToArrange, setGoalCards, setPickPileCards);
          }}
        >
          Restart
        </button>
      </Container>
      {pickPileCards.length === 0 && cardsToArrange.flat().length === 0 && (
        <VictoryModalContainer>
          <VictoryModal
            setSeconds={setSeconds}
            setCardsToArrange={setCardsToArrange}
            setPickPileCards={setPickPileCards}
            setGoalCards={setGoalCards}
            gameDuration={gameDuration}
          />
        </VictoryModalContainer>
      )}
    </>
  );
}

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 0.5rem;
  color: white;
  p {
    font-size: 1.5rem;
    font-weight: bold;
    margin-right: 0.5rem;
  }
  button {
    border: none;
    font-size: 1.2rem;
    font-weight: inherit;
    border-radius: 0.6rem;
    padding: 0.3rem 0.6rem;
    cursor: pointer;
    margin-left: 1rem;
    background-color: rgba(255, 90, 0, 1);
    color: white;
    letter-spacing: 1px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    :hover {
      background-color: rgba(255, 50, 0, 1);
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
    }
  }
`;

const VictoryModalContainer = styled.div`
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`;

export default Restart;
