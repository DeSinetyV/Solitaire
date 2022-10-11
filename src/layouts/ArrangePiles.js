import React, { useEffect } from 'react';
import styled from 'styled-components';
import ArrangePile from '../components/ArrangePile';
import { arrangingCards } from '../utils';

function ArrangePiles({
  boardClick,
  setBoardClick,
  selectedCards,
  setSelectedCards,
  cardsToArrange,
  setCardsToArrange,
  pickPile,
  setPickPile,
  goalCards,
  setGoalCards,
}) {
  useEffect(() => {
    if (selectedCards.length === 2) {
      console.log(selectedCards);

      arrangingCards(cardsToArrange, selectedCards, setCardsToArrange);
      if (
        (selectedCards[0].number + 1 === selectedCards[1].number &&
          selectedCards[0].color !== selectedCards[1].color &&
          pickPile.includes(selectedCards[0])) ||
        typeof selectedCards[1] === 'string'
      ) {
        setPickPile((prev) => {
          console.log(prev);
          return prev.filter((card) => {
            return (
              card.number !== selectedCards[0].number ||
              card.category !== selectedCards[0].category
            );
          });
        });

        setCardsToArrange(
          cardsToArrange.map((pile) => {
            if (pile.includes(selectedCards[1])) {
              pile.splice(
                pile.indexOf(selectedCards[1]) + 1,
                0,
                selectedCards[0],
              );
            }
            return pile;
          }),
        );
      }
      setSelectedCards([]);
    }
    if (boardClick) {
      if (selectedCards.length > 0) {
        setSelectedCards([]);
      }
      setBoardClick(false);
    }
  }, [
    selectedCards,
    cardsToArrange,
    boardClick,
    setBoardClick,
    setSelectedCards,
    setCardsToArrange,
    pickPile,
    setPickPile,
  ]);

  return (
    <Container>
      {cardsToArrange?.map((pile, i) => {
        return (
          <ArrangePile
            setCardsToArrange={setCardsToArrange}
            cardsToArrange={cardsToArrange}
            key={i}
            pile={pile}
            pileIndex={i.toString()}
            setSelectedCards={setSelectedCards}
            selectedCards={selectedCards}
            pickPile={pickPile}
            setPickPile={setPickPile}
            setGoalCards={setGoalCards}
          />
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-around; ;
`;

export default ArrangePiles;
