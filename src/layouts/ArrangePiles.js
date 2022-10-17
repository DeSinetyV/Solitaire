import React from 'react';
import styled from 'styled-components';
import ArrangePile from '../components/ArrangePile';

function ArrangePiles({
  selectedCards,
  setSelectedCards,
  cardsToArrange,
  setCardsToArrange,
  pickPile,
  setPickPile,
  setGoalCards,
}) {
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
  justify-content: space-evenly;
  margin: 0 auto;
  width: 100%;
  height: 100%;
`;

export default ArrangePiles;
