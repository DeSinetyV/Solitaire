import React, { useEffect } from 'react';
import styled from 'styled-components';
import ArrangePile from '../components/ArrangePile';
import { arrangingCards } from '../utils';


function ArrangePiles({
  boardClick,
  setBoardClick,
  selectedCards,
  setSelectedCards,
  cards,
  setCards,
}) {
  useEffect(() => {
    if (selectedCards.length === 2) {
      arrangingCards(cards, selectedCards, setCards);
      if (
        (selectedCards[0].id + 1 === selectedCards[1].id &&
          selectedCards[0].color !== selectedCards[1].color && 
          pickPile.includes(selectedCards[0])) ||
          typeof selectedCards[1] === 'string'
      ) {

      setPickPile(prev => {console.log(prev) ;return prev.filter(card => {
        return card.id !== selectedCards[0].id || card.category !== selectedCards[0].category})
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
  }, [
    selectedCards,
    cards,
    boardClick,
    setBoardClick,
    setSelectedCards,
    setCards,
  ]);

  return (
    <Container>
      {cards?.map((pile, i) => {
        return (
          <ArrangePile
            setCards={setCards}
            cards={cards}
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
;
`;

export default ArrangePiles;
