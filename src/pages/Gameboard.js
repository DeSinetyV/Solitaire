import React, { useState } from 'react';
import styled from 'styled-components';
import { CARDS } from '../data';
import ArrangePiles from '../layouts/ArrangePiles';
import GoalPiles from '../layouts/GoalPiles';
import PickPiles from '../layouts/PickPiles';
import '../style/Pile.css'
import Draw from '../layouts/DrawPiles';


function Gameboard() {
  const [cards, setCards] = useState([...CARDS]);
  const [arrangePileCards, setArrangePileCards] = useState([
    ...cards.slice(0, 28),
  ]);
  const [pickPileCards, setPickPileCards] = useState([...cards.slice(28)]);
  const [boardClick, setBoardClick] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  return (
    <GameboardContainer onClick={() => setBoardClick(true)}>
      <Board>
        <TopContent>
          <PickPiles pickPileCards={pickPileCards} />
          <Draw 
          selectedCards={selectedCards}
          setSelectedCards={setSelectedCards}
          drawCard={pickPileCards}
          boardClick={boardClick}
          setBoardClick={setBoardClick}
          ></Draw>
          <GoalPiles />
        </TopContent>
        <BottomContent>
          <ArrangePiles
            selectedCards={selectedCards}
            setSelectedCards={setSelectedCards}
            arrangePileCards={arrangePileCards}
            boardClick={boardClick}
            setBoardClick={setBoardClick}
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
