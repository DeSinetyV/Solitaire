import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ArrangePile from '../components/ArrangePile';
import { arrangingCards, distributeCarts } from '../utils';

function ArrangePiles({selectedCards,setSelectedCards, arrangePileCards, boardClick, setBoardClick,setPickPile }) {
  const [cards, setCards] = useState(distributeCarts(arrangePileCards));
  useEffect(() => {
    if (selectedCards.length === 2) {
      // arrangingCards(cards, selectedCards, setCards);
      if (
        (selectedCards[0].id + 1 === selectedCards[1].id &&
          selectedCards[0].color !== selectedCards[1].color)
      ) {
      setPickPile(prev => {console.log(prev) ;return prev.filter(cart => {
        return cart.id === selectedCards[0].id && cart.category === selectedCards[0].category})
      }
      )
      
      setCards(cards.map(pile =>{
        if(pile.includes(selectedCards[1])){
          pile.splice(pile.indexOf(selectedCards[1])+1,0,selectedCards[0])
        }
        return pile
      }))}
      setSelectedCards([]);
    }
    if (boardClick) {
      if (selectedCards.length > 0) {
        setSelectedCards([]);
      }
      setBoardClick(false);
    }
  }, [selectedCards,setSelectedCards, cards, boardClick, setBoardClick,setPickPile]);
// console.log(selectedCards)
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
