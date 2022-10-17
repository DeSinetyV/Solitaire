import React from 'react';
import styled from 'styled-components';
import { reInitialData } from '../data';

function VictoryModal({
  setCardsToArrange,
  setGoalCards,
  setPickPileCards,
  gameDuration,
  setSeconds,
}) {
  return (
    <Modal>
      <div className='box'>
        <p>congratulations</p>
        <p> Game duration : {gameDuration}</p>
        <button
          onClick={() => {
            setSeconds(0);
            reInitialData(setCardsToArrange, setGoalCards, setPickPileCards);
          }}
          className='restart-btn'
        >
          Restart
        </button>
      </div>
    </Modal>
  );
}

export default VictoryModal;

const Modal = styled.div`
  padding: 1rem;
  background-color: white;
  width: 500px;
  border-radius: 0.7rem;
  font-size: 1.4rem;
  .box {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem;
    border-radius: inherit;
    box-shadow: 0 0 5px black;
    background-color: rgba(25, 250, 60, 0.5);
    p {
      letter-spacing: 2px;
      font-weight: bold;
      font-size: 2rem;
    }
  }
  .restart-btn {
    font-size: 1.2rem;
    border: none;
    background-color: green;
    color: white;
    padding: 0.5rem 0.7rem;
    border-radius: inherit;
    cursor: pointer;
    letter-spacing: 2px;
  }
`;
