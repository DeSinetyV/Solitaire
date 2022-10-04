import React from 'react';
import { useDrop } from 'react-dnd';
import styled from 'styled-components';
import { addSelectedToCards } from '../utils';
import Card from './Card';
import CardPlaceholder from './CardPlaceholder';

function ArrangePile({ pile, setSelectedCards, selectedCards, pileIndex }) {
  const [{ isOver }, dropTarget] = useDrop(() => ({
    accept: 'CARD',
    drop: (item) => dropCardInPile(item.cart),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  function dropCardInPile(cart) {
    console.log(cart);
  }

  if (pile.includes(selectedCards[0])) {
    addSelectedToCards(pile, selectedCards);
  } else {
    pile.map((card) => delete card.selected);
  }

  if (pile.length > 0) {
    return (
      <Pile isOver={isOver} ref={dropTarget}>
        {pile.map((cart, i) => (
          <Card
            key={`${cart.id}${cart.category}`}
            cart={cart}
            cartIndex={i.toString()}
            setSelectedCards={setSelectedCards}
          />
        ))}
      </Pile>
    );
  }
  return (
    <div
      onClick={() => {
        setSelectedCards((prev) => [...prev, pileIndex]);
      }}
    >
      <CardPlaceholder />
    </div>
  );
}

const Pile = styled.div`
  height: 200px;
  width: 100px;
  position: relative;
  border: ${({ isOver }) => (isOver ? 'solid 2px blue' : 'none')};
`;

export default ArrangePile;
