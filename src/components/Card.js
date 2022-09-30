import React from 'react';
import styled from 'styled-components';

function Card({ cart, setSelectedCards } ) {
  // console.log(cart);
  return (
    <Frame
      displayed={cart.displayed}
      selected={cart.selected}
      onClick={() =>
        cart.displayed ? setSelectedCards((prev) => [...prev, cart]) : null
      }
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
  img {
    width: 100%;
    border-radius: 0.4rem;
  }
`;

export default Card;
