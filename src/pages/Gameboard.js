import React, { useState } from 'react';
import styled from 'styled-components';
import { CARDS } from '../data';
import ArrangePiles from '../layouts/ArrangePiles';
import { distributeCarts } from '../utils';
import GoalPiles from '../layouts/GoalPiles';
import '../style/Pile.css';
import Draw from '../layouts/DrawPiles';

function Gameboard() {
  const [cardsToArrange, setCardsToArrange] = useState(
    distributeCarts(CARDS.slice(0, 28)),
  );
  const [pickPileCards, setPickPileCards] = useState(CARDS.slice(28));
  const [selectedCards, setSelectedCards] = useState([]);
  //const [boardClick, setBoardClick] = useState(false);
  const [goalCards, setGoalCards] = useState([
    { category: 'clubs', cards: [] },
    { category: 'diamonds', cards: [] },
    { category: 'hearts', cards: [] },
    { category: 'spades', cards: [] },
  ]);

  return (
    <GameboardContainer>
      <Board>
        <TopContent>
          <Draw
            pickPile={pickPileCards}
            setSelectedCards={setSelectedCards}
          ></Draw>
          <GoalPiles
            cardsToArrange={cardsToArrange}
            setCardsToArrange={setCardsToArrange}
            goalCards={goalCards}
            setGoalCards={setGoalCards}
            selectedCards={selectedCards}
            setSelectedCards={setSelectedCards}
            setPickPile={setPickPileCards}
            pickPileCards={pickPileCards}
            setPickPileCards={setPickPileCards}
          />
        </TopContent>
        <BottomContent>
          <ArrangePiles
            cardsToArrange={cardsToArrange}
            setCardsToArrange={setCardsToArrange}
            selectedCards={selectedCards}
            setSelectedCards={setSelectedCards}
            pickPile={pickPileCards}
            setPickPile={setPickPileCards}
            goalCards={goalCards}
            setGoalCards={setGoalCards}
          />
        </BottomContent>
      </Board>
    </GameboardContainer>
  );
}

const GameboardContainer = styled.div`
  min-height: 100vh;
  min-width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Board = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: green;
  padding: 1rem;
`;

const TopContent = styled.div`
  padding: 1.5rem 1rem;
  display: flex;
  justify-content: space-between;
`;

const BottomContent = styled.div`
  margin-top: 2rem;
`;

export default Gameboard;
