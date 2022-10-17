import React from 'react';
import styled from 'styled-components';
import GoalPile from '../components/GoalPile';

function GoalPiles({
  selectedCards,
  setSelectedCards,
  cardsToArrange,
  setCardsToArrange,
  goalCards,
  setGoalCards,
  pickPileCards,
  setPickPileCards,
}) {
  return (
    <Container>
      {goalCards?.map((pile) => {
        return (
          <GoalPile
            key={pile.category}
            pile={pile}
            selectedCards={selectedCards}
            setSelectedCards={setSelectedCards}
            cardsToArrange={cardsToArrange}
            setCardsToArrange={setCardsToArrange}
            setGoalCards={setGoalCards}
            pickPileCards={pickPileCards}
            setPickPileCards={setPickPileCards}
          />
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1.4rem;
`;

export default GoalPiles;
