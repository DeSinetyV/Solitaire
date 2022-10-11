import React, { memo } from 'react';
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
  setCardsToArrange,
  cardsToArrange,
  pickPile,
  setPickPile,
  setGoalCards,
}) {
  const [{ isOver, draggingCard }, dropTarget] = useDrop(
    () => ({
      accept: 'CARD',
      drop: (item) => {
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
            setGoalCards((prev) =>
              prev.map((pile) => {
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
    [cardsToArrange],
  );

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

const Layer = styled.div`
  opacity: ${({ hovering }) => (hovering ? '.5' : '1')};
`;

export default memo(ArrangePile);
