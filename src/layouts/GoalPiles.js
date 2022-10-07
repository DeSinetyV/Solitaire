import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import CardPlaceholder from '../components/CardPlaceholder';
import GoalPile from '../components/GoalPile';
// import { arrangingCards } from '../utils';

function GoalPiles({selectedCards,setSelectedCards,cards ,setCards}) {

  const [categorys, setCategorys] = useState (['clubs','diamonds','hearts','spades']);

  return (
    <Container>
      {categorys?.map((category, i) => {
        return (
          <GoalPile
            key={i}
            category={category}
            pileIndex={i.toString()}
            selectedCards={selectedCards}
            setSelectedCards={setSelectedCards}
            carts={cards}
            setCarts={setCards}
          />
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
  width: 67%;
`;

export default GoalPiles;
