import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CardPlaceholder from '../components/CardPlaceholder';

function GoalPiles() {
  const [cards, setCards] = useState([[],[],[],[]]);
  const [selectedCards, setSelectedCards] = useState([]);
  console.log(selectedCards);
  console.log('test');



  return (
    <Container>
      <CardPlaceholder />
      <CardPlaceholder />
      <CardPlaceholder />
      <CardPlaceholder />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
`;

export default GoalPiles;
