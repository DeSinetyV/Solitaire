import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { setCards, GOALCARDS } from '../data';
import ArrangePiles from '../layouts/ArrangePiles';
import {
  arrangingCards,
  distributeCarts,
  insertToCardsToArrange,
  insertToGoalPile,
  insertToGoalPileWithClick,
} from '../utils';
import GoalPiles from '../layouts/GoalPiles';
import Draw from '../layouts/DrawPiles';
import { useBoardClick } from '../Context/BoardContext';

import Restart from '../components/Restart';

function Gameboard() {
  const CARDS = [...setCards()];
  const [cardsToArrange, setCardsToArrange] = useState(
    distributeCarts(CARDS.slice(0, 28)),
  );

  const [pickPileCards, setPickPileCards] = useState(CARDS.slice(28));
  const [selectedCards, setSelectedCards] = useState([]);
  const { boardClick, setBoardClick } = useBoardClick();
  const [goalCards, setGoalCards] = useState([...GOALCARDS]);

  useEffect(() => {
    if (boardClick) {
      if (selectedCards.length > 0) {
        setSelectedCards([]);
      }
      setBoardClick(false);
    }
  }, [boardClick, selectedCards, setBoardClick]);

  useEffect(() => {
    if (selectedCards.length === 2) {
      if (selectedCards[0].id === selectedCards[1].id) {
        insertToGoalPileWithClick(
          setGoalCards,
          selectedCards,
          pickPileCards,
          setPickPileCards,
          setCardsToArrange,
        );
      }
      if (pickPileCards.indexOf(selectedCards[1]) === -1) {
        if (pickPileCards.indexOf(selectedCards[0]) !== -1) {
          if (
            cardsToArrange.flat().indexOf(selectedCards[1]) !== -1 ||
            typeof selectedCards[1] === 'number'
          ) {
            insertToCardsToArrange(
              selectedCards,
              setCardsToArrange,
              setPickPileCards,
              setGoalCards,
              pickPileCards,
            );
          } else {
            insertToGoalPile(
              selectedCards,
              setGoalCards,
              setPickPileCards,
              setCardsToArrange,
              pickPileCards,
            );
          }
        } else if (cardsToArrange.flat().indexOf(selectedCards[0]) !== -1) {
          if (
            cardsToArrange.flat().indexOf(selectedCards[1]) !== -1 ||
            typeof selectedCards[1] === 'number'
          ) {
            arrangingCards(cardsToArrange, selectedCards, setCardsToArrange);
          } else {
            insertToGoalPile(
              selectedCards,
              setGoalCards,
              setPickPileCards,
              setCardsToArrange,
              pickPileCards,
            );
          }
        } else {
          insertToCardsToArrange(
            selectedCards,
            setCardsToArrange,
            setPickPileCards,
            setGoalCards,
            pickPileCards,
          );
        }
      }
      delete selectedCards[0].selected;
      setSelectedCards([]);
    }
  }, [pickPileCards, selectedCards, cardsToArrange]);

  return (
    <>
      <GameboardContainer onClick={() => setBoardClick(true)}>
        <Restart
          setCardsToArrange={setCardsToArrange}
          setPickPileCards={setPickPileCards}
          setGoalCards={setGoalCards}
          pickPileCards={pickPileCards}
          cardsToArrange={cardsToArrange}
        />

        <Board>
          <TopContent>
            <Draw
              pickPile={pickPileCards}
              setSelectedCards={setSelectedCards}
              selectedCards={selectedCards}
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
    </>
  );
}

const GameboardContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: green;
`;

const Board = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  margin: 0 auto;
  width: 90%;
`;

const TopContent = styled.div`
  padding: 0 1rem 2rem 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 90%;
  margin: 0 auto;
`;

const BottomContent = styled.div`
  margin-top: 2rem;
  display: block;
  background-color: green;
`;

export default Gameboard;
