import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ArrangePile from '../components/ArrangePile';
import { distributeCarts } from '../utils';

function ArrangePiles({ arrangePileCards }) {
  const [cards, setCards] = useState(distributeCarts(arrangePileCards));
  const [selectedCards, setSelectedCards] = useState([]);

  //  console.log(cards);

  useEffect(() => {
    // console.log('random select :', selectedCards);
    if (selectedCards.length === 2) {
      if (
        selectedCards[0].id + 1 === selectedCards[1].id &&
        selectedCards[0].color !== selectedCards[1].color
      ) {
        let firstSelect = cards.filter((pile) =>
          pile.includes(selectedCards[0]),
        );
        console.log(firstSelect);

        const res = cards.map((pile) => {
          if (pile.includes(selectedCards[1])) {
            pile = pile.concat(
              firstSelect.slice(firstSelect.indexOf(selectedCards[0])),
            );
            console.log(
              firstSelect.slice(firstSelect.indexOf(selectedCards[0])),
            );
          }

          if (pile.includes(selectedCards[0])) {
            pile.splice(pile.indexOf(selectedCards[0]));
          }
          return pile;
        });
        setCards(res);
        setSelectedCards([]);
      } else {
        setSelectedCards([]);
      }
    }
  }, [selectedCards, cards]);

  return (
    <Container>
      {cards?.map((pile, i) => (
        <ArrangePile key={i} pile={pile} setSelectedCards={setSelectedCards} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

export default ArrangePiles;
