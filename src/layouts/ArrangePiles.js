import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ArrangePile from '../components/ArrangePile';
import { arrangingCards, distributeCarts } from '../utils';

function ArrangePiles({ arrangePileCards }) {
  const [cards, setCards] = useState(distributeCarts(arrangePileCards));
  const [selectedCards, setSelectedCards] = useState([]);
  console.log(selectedCards);
  useEffect(() => {
    console.log([1].indexOf(1));

    //    console.log('random select :', selectedCards);
    if (selectedCards.length === 2) {
      if (
        selectedCards[0].id + 1 === selectedCards[1].id &&
        selectedCards[0].color !== selectedCards[1].color
      ) {
        setCards(arrangingCards(cards, selectedCards));
        setSelectedCards([]);
      } else {
        setSelectedCards([]);
      }
    }
  }, [selectedCards, cards]);

  return (
    <Container>
      {cards?.map((pile, i) => {
        return (
          <ArrangePile
            key={i}
            pile={pile}
            setSelectedCards={setSelectedCards}
          />
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

export default ArrangePiles;
