import React, { useEffect,useState } from 'react';
import styled from 'styled-components';
import ArrangePile from '../components/ArrangePile';
import { arrangingCards, distributeCarts } from '../utils';

function ArrangePiles({arrangePileCards, boardClick, setBoardClick,selectedCards,setSelectedCards}) {
  const [cards, setCards] = useState(distributeCarts(arrangePileCards));
  // const [selectedCards, setSelectedCards] = useState([]);
  useEffect(() => {
    console.log(selectedCards.length);
    console.log(cards);

    //    console.log('random select :', selectedCards);
    if (selectedCards.length === 2) {
      arrangingCards(cards, selectedCards, setCards);
      setSelectedCards([]);
    }
    if (boardClick) {
      if (selectedCards.length > 0) {
        setSelectedCards([]);
      }
      setBoardClick(false);
    }
  }, [selectedCards, cards, boardClick, setBoardClick, setSelectedCards, setCards]);

  return (
    <Container>
      {cards?.map((pile, i) => {
        return (
          <ArrangePile
            key={i}
            pile={pile}
            pileIndex={i.toString()}
            setSelectedCards={setSelectedCards}
            selectedCards={selectedCards}
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
