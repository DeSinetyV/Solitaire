import React from 'react';
import styled from 'styled-components';



function Card({ cart, setSelectedCards, cartIndex }) {

  return (
    <Frame
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
  .frame {
  }
  width: 4rem;
  cursor: ${({ displayed }) => (displayed ? 'pointer' : 'auto')};
  box-shadow: ${({ selected }) => (selected ? '0 0 10px orange' : 'none')};
  border-radius: 0.4rem;
  position: absolute;
  top: ${({ cartIndex }) => `${Number(cartIndex) * 15}px`};
  img {
    width: 150px;
    border-radius: 0.4rem;
  }
`;

export default Card;
