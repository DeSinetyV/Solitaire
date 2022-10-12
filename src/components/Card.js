import React, { memo, useEffect } from 'react';
import styled from 'styled-components';
import { useDrag } from 'react-dnd';

function Card({
  card,
  setSelectedCards,
  cartIndex,
  setAddToGoalPile,
  selectedCards,
}) {
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
    // console.log(selectedCards);
    // if (selectedCards.length > 0) {
    //   if (card.id !== selectedCards[0].id && Object.hasOwn(card, 'selected')) {
    //     delete card.selected;
    //   }
    // }
    if (selectedCards.length === 0) {
      delete card.selected;
    }
  }, [selectedCards, card, card.selected]);

  return (
    <Frame
      isDragging={isDragging}
      displayed={card.displayed}
      selected={card.selected}
      cartIndex={cartIndex}
      onClick={(e) => {
        e.stopPropagation();
        if (card.displayed) {
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
        onClick={() => {
          if (setAddToGoalPile) setAddToGoalPile(true);
        }}
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
  box-shadow: ${({ selected }) => (selected ? '0 0 20px orange' : 'none')};
  border-radius: 0.4rem;
  ${({ cartIndex }) =>
    cartIndex ? `position: absolute; top: ${Number(cartIndex) * 15}px` : ''};
  img {
    width: 100px;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.7);
    border-radius: 0.4rem;
  }
`;

export default memo(Card);
