import React from 'react';
import styled from 'styled-components';

function Card({ cart, setSelectedCards }) {
  return (
    <Frame
      displayed={cart.displayed}
      onClick={() =>
        cart.displayed ? setSelectedCards((prev) => [...prev, cart]) : null
      }
    >
      <img
        src={
          cart.displayed
            ? `images/CardsFaces/${cart.category}/${cart.category}${
                cart.id < 10 ? '0' + cart.id : cart.id
              }.png`
            : 'images/CardsFaces/back_card.jpg'
        }
        alt={`${cart.category}${cart.id}`}
      />
    </Frame>
  );
}

const Frame = styled.div`
  width: 4rem;
  cursor: ${({ displayed }) => (displayed ? 'pointer' : 'auto')};
  img {
    width: 100%;
    border-radius: 0.4rem;
  }
`;

export default Card;
