import React from 'react';
import styled from 'styled-components';
import { useDrag } from 'react-dnd';


function Card({ cart, setSelectedCards, cartIndex }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CARD',
    item: { cart: cart },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Frame
      isDragging={isDragging}
      ref={drag}
      displayed={cart.displayed}
      selected={cart.selected}
      cartIndex={cartIndex}
      onClick={(e) => {
        if (cart.displayed) {
          e.stopPropagation();
          setSelectedCards((prev) => [...prev, cart]);
        }
      }}
    >
      <img
        src={
          cart.displayed
            ? `images/CardsFaces/${cart.category}/${cart.image}`
            : 'images/CardsFaces/back_card.jpg'
        }
        alt={`${cart.category}/${cart.img}`}
      />
    </Frame>
  );
}

const Frame = styled.div`
  display: ${({ isDragging }) => (isDragging ? 'none' : 'auto')};
  width: 4rem;
  cursor: ${({ displayed }) => (displayed ? 'pointer' : 'auto')};
  box-shadow: ${({ selected }) => (selected ? '0 0 10px orange' : 'none')};
  border-radius: 0.4rem;
  ${({ cartIndex }) =>
    cartIndex ? `position: absolute; top: ${Number(cartIndex) * 15}px` : ''};
  img {
    width: 100px;
    border-radius: 0.4rem;
  }
`;

export default Card;
