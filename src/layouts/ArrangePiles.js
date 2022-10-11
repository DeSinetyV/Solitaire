import React, { useEffect } from 'react';
import styled from 'styled-components';
import ArrangePile from '../components/ArrangePile';
import { arrangingCards } from '../utils';

function ArrangePiles({
  boardClick,
  setBoardClick,
  selectedCards,
  setSelectedCards,
  cards,
  setCards,
  pickPile,
  setPickPile,
  goalCards,
  setGoalCards,
}) {
  useEffect(() => {
    if (selectedCards.length === 2) {
      console.log(selectedCards);

      arrangingCards(cards, selectedCards, setCards);
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

        setCards(
          cards.map((pile) => {
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
    cards,
    boardClick,
    setBoardClick,
    setSelectedCards,
    setCards,
    pickPile,
    setPickPile,
  ]);

  return (
    <Container>
      {cards?.map((pile, i) => {
        return (
          <ArrangePile
            setCards={setCards}
            cards={cards}
            key={i}
            pile={pile}
            pileIndex={i.toString()}
            setSelectedCards={setSelectedCards}
            selectedCards={selectedCards}
            pickPile={pickPile}
            setPickPile={setPickPile}
            goalCards={goalCards}
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
