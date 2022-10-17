import React, { memo, useEffect } from 'react';
import styled from 'styled-components';
import { useDrag } from 'react-dnd';
import { useBoardClick } from '../Context/BoardContext';

function Card({
  card,
  setSelectedCards,
  cartIndex,
  isOver,
  canDrop,
  goalCartIndex,
}) {
  const { boardClick } = useBoardClick();
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'CARD',
      item: card,
      beginDrag: (item) => item,
      canDrag: card.displayed === true,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
        item: monitor.getItem(),
      }),
    }),
    [card.displayed, card],
  );

  useEffect(() => {
    if (boardClick && card.selected) {
      delete card.selected;
    }
  }, [card, card.selected, boardClick]);

  return (
    <Frame
      isOver={isOver}
      canDrop={canDrop}
      isDragging={isDragging}
      displayed={card.displayed}
      selected={card.selected}
      cartIndex={cartIndex}
      goalCartIndex={goalCartIndex}
      onClick={(e) => {
        if (card.displayed) {
          e.stopPropagation();
          setSelectedCards((prev) => {
            if (prev.length === 0) {
              card.selected = true;
            }
            return [...prev, card];
          });
        }
      }}
    >
      <img
        ref={drag}
        src={
          card.displayed
            ? `images/CardsFaces/${card.category}/${card.image}`
            : 'images/CardsFaces/back_card.jpg'
        }
        alt={`${card.category}/${card.image}`}
      />
    </Frame>
  );
}

const Frame = styled.div`
  display: ${({ isDragging }) => (isDragging ? 'none' : 'auto')};
  width: 100px;
  cursor: ${({ displayed }) => (displayed ? 'pointer' : 'auto')};
  box-shadow: ${({ selected, isOver, canDrop }) =>
    canDrop && isOver
      ? '0 0 10px rgba(0, 255, 0, 1)'
      : selected || isOver
      ? '0 0 10px orange'
      : 'none'};
  border-radius: 0.4rem;
  ${({ cartIndex, goalCartIndex }) =>
    goalCartIndex
      ? `position: absolute; top:0`
      : cartIndex
      ? `position: absolute; top: ${Number(cartIndex) * 15}px`
      : ''};
  img {
    width: 100px;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.7);
    border-radius: 0.4rem;
  }
`;

export default memo(Card);
