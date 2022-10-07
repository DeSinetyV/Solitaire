import React, { useEffect, useState, useRef } from 'react';
import { useDrop } from 'react-dnd';
import styled from 'styled-components';
import {
  addSelectedToCards,
  dragCardsList,
  removeExtractedCards,
} from '../utils';
import Card from './Card';
import CardPlaceholder from './CardPlaceholder';

function ArrangePile({
  pile,
  setSelectedCards,
  selectedCards,
  pileIndex,
  setCards,
  cards,
}) {
  const [indexPile, setIndexPile] = useState(null);
  const dragCards = useRef(null);

  const [{ isOver, draggingCard }, dropTarget] = useDrop(
    () => ({
      accept: 'CARD',
      drop: (item) => {
        setIndexPile(pileIndex);
        if (dragCards.current) {
          pile.splice(pile.length, 0, ...dragCards.current);
        } else {
          pile.push(item);
        }
      },
      canDrop: (item) => {
        if (pile.length === 0) {
          return true;
        } else {
          return (
            item.number + 1 === pile[pile.length - 1].number &&
            item.color !== pile[pile.length - 1].color
          );
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        draggingCard: monitor.getItem(),
      }),
    }),
    [dragCards, pile, cards, pileIndex],
  );
  console.log(dragCards.current, 'dragging', draggingCard);

  useEffect(() => {
    if (draggingCard) {
      dragCards.current = dragCardsList(draggingCard, cards);
    }
    if (indexPile && dragCards.current) {
      removeExtractedCards(cards, setCards, dragCards, indexPile);
      setIndexPile(null);
    }
  }, [draggingCard, cards, indexPile, setCards, setIndexPile, dragCards]);

  if (pile.includes(selectedCards[0])) {
    addSelectedToCards(pile, selectedCards);
  } else {
    pile.map((card) => delete card.selected);
  }

  if (pile.length > 0) {
    return (
      <Pile isOver={isOver} ref={dropTarget}>
        {pile.map((cart, i) => {
          return (
            <Card
              key={cart.id}
              cart={cart}
              cartIndex={i.toString()}
              setSelectedCards={setSelectedCards}
            />
          );
        })}
      </Pile>
    );
  }
  return (
    <div
      ref={dropTarget}
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
