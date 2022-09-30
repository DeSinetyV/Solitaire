import React from 'react';
import styled from 'styled-components';
import CardPlaceholder from '../components/CardPlaceholder';

function GoalPiles() {
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
  width:67%;
`;

export default GoalPiles;
