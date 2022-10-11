<<<<<<< HEAD
import React, { useEffect, useState, useRef } from 'react';
=======
import React, { memo } from 'react';
>>>>>>> 1762117 (dnd finished)
import { useDrop } from 'react-dnd';
import styled from 'styled-components';
import {
  addSelectedToCards,
  dragCardsList,
  insertExtractedCards,
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
  pickPile,
  setPickPile
}) {
<<<<<<< HEAD
  const [indexPile, setIndexPile] = useState(null);
  const dragCards = useRef(null);
  const [dragCard, setDragCard] = useState(null);

=======
>>>>>>> 1762117 (dnd finished)
  const [{ isOver, draggingCard }, dropTarget] = useDrop(
    () => ({
      accept: 'CARD',
      drop: (item) => {
<<<<<<< HEAD
        setIndexPile(pileIndex);
        if (dragCards.current) {
          pile.splice(pile.length, 0, ...dragCards.current);
        } else {
          setDragCard(item);
          pile.push(item);
=======
        if (cardsToArrange.flat().indexOf(item) !== -1) {
          setCardsToArrange(
            insertExtractedCards(
              cardsToArrange,
              pileIndex,
              dragCardsList(item, cardsToArrange),
            ),
          );
        } else {
          if (pickPile.indexOf(item) !== -1) {
            setPickPile((prev) => prev.filter((cart) => cart.id !== item.id));
          } else {
            setGoalCards(
              goalCards.map((pile) => {
                return {
                  category: pile.category,
                  cards: pile.cards.filter((card) => card.id !== item.id),
                };
              }),
            );
          }
          setCardsToArrange(
            cardsToArrange.map((pile, i) => {
              return pileIndex === i.toString() ? [...pile, item] : pile;
            }),
          );
>>>>>>> 1762117 (dnd finished)
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
<<<<<<< HEAD
    [dragCards, pile, cards, pileIndex,dragCard,pickPile],
  );

  useEffect(() => {
    if (draggingCard) {
      dragCards.current = dragCardsList(draggingCard, cards);
    }
    if (indexPile &&dragCards.current) {
      removeExtractedCards(cards, setCards, dragCards, indexPile);
      setIndexPile(null);
    }
    if(dragCard){
      setPickPile(prev => prev.filter(cart=> cart.id !== dragCard.id))
    }
  }, [draggingCard, cards, indexPile, setCards, setIndexPile, dragCards,dragCard,setPickPile]);

=======
    [cardsToArrange],
  );

>>>>>>> 1762117 (dnd finished)
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
            <Layer
              key={i.toString()}
              hovering={
                pile.indexOf(draggingCard) !== -1 &&
                draggingCard &&
                i > pile.indexOf(draggingCard)
                  ? true
                  : false
              }
            >
              <Card
                key={cart.id}
                cart={cart}
                cartIndex={i.toString()}
                setSelectedCards={setSelectedCards}
              />
            </Layer>
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
  width: 100px;
  position: relative;
  border: ${({ isOver }) => (isOver ? 'solid 2px blue' : 'none')};
`;

<<<<<<< HEAD
export default ArrangePile;
=======
const Layer = styled.div`
  opacity: ${({ hovering }) => (hovering ? '.5' : '1')};
`;

export default memo(ArrangePile);
>>>>>>> 1762117 (dnd finished)
