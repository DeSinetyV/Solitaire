import React, { memo } from 'react';
import { useDrop } from 'react-dnd';
import styled from 'styled-components';
import { dragCardsList, insertExtractedCards } from '../utils';
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
  const [{ isOver, canDrop, draggingCard }, dropTarget] = useDrop(
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
        canDrop: monitor.canDrop(),
      }),
    }),
    [cardsToArrange],
  );

  if (pile.length > 0) {
    return (
      <Pile ref={dropTarget}>
        {pile.map((card, i) => {
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
                isOver={isOver}
                canDrop={canDrop}
                key={card.id}
                card={card}
                cartIndex={i.toString()}
                setSelectedCards={setSelectedCards}
                selectedCards={selectedCards}
              />
            </Layer>
          );
        })}
      </Pile>
    );
  }
  return (
    <PlaceHolderFrame
      canDrop={canDrop}
      isOver={isOver}
      ref={dropTarget}
      onClick={() => {
        setSelectedCards((prev) => [...prev, Number(pileIndex)]);
      }}
    >
      <CardPlaceholder />
    </PlaceHolderFrame>
  );
}

const Pile = styled.div`
  width: 100px;
  height: 100%;
  position: relative;
`;

const Layer = styled.div`
  opacity: ${({ hovering }) => (hovering ? '.5' : '1')};
`;

const PlaceHolderFrame = styled.div`
  cursor: pointer;
  border-radius: 0.6rem;
  box-shadow: ${({ isOver, canDrop }) =>
    canDrop && isOver
      ? '0 0 10px rgba(0, 255, 0, 1)'
      : isOver
      ? '0 0 10px orange'
      : 'none'};
`;

export default memo(ArrangePile);
