import React, { useState } from 'react';
import styled from 'styled-components';
import { CARDS } from '../data';
import ArrangePiles from '../layouts/ArrangePiles';
import {distributeCarts } from '../utils';
import GoalPiles from '../layouts/GoalPiles';
import PickPiles from '../layouts/PickPiles';
import '../style/Pile.css';
import Draw from '../layouts/DrawPiles';

function Gameboard() {
  const [cards, setCards] = useState([...CARDS]);
  const [arrangePileCards, setArrangePileCards] = useState([
    ...cards.slice(0, 28),
  ]);
  const [pickPileCards, setPickPileCards] = useState([...cards.slice(28)]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [boardClick, setBoardClick] = useState(false);
  const [goalCards,setGoalCards] = useState([]);


  // const [cards, setCards] = useState(distributeCarts(arrangePileCards));

  // console.log(arrangePileCards.length);

  return (
    <GameboardContainer>
      <Board>
        <TopContent>
          <PickPiles pickPileCards={pickPileCards} selectedCards={selectedCards} setSelectedCards={setSelectedCards} />
          <GoalPiles cards={cards} setCards={setCards} goalCards={goalCards} arrangePileCards={arrangePileCards} selectedCards={selectedCards} setSelectedCards={setSelectedCards} />

        </TopContent>
        <BottomContent>
          <ArrangePiles cards ={cards} setCards ={setCards} arrangePileCards={arrangePileCards} selectedCards={selectedCards} setSelectedCards={setSelectedCards} />
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
  width: 90%;
  height: 90%;
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
