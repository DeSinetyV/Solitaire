import React from 'react';
import styled from 'styled-components';
import Card from './Card';

function ArrangePile({ pile, setSelectedCards }) {

  return (
    <Pile>
      {pile.map((cart) => (
        <Card
          key={`${cart.id}${cart.category}`}
          cart={cart}
          setSelectedCards={setSelectedCards}
        />
      ))}
    </Pile>
  );
}

const Pile = styled.div``;

export default ArrangePile;
