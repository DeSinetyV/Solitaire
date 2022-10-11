import React from 'react';
import styled from 'styled-components';

function CardPlaceholder({ category, setAddToGoalPile }) {
  return (
    <Placeholder>
      <img
        src={category && `images/CardsFaces/${category}/${category}.png`}
        alt={category && `${category}`}
      />
    </Placeholder>
  );
}

const Placeholder = styled.div`
  width: 100px;
  height: 150px;
  border: 2px orange solid;
  border-radius: 0.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 60%;
    /* margin:20%; */
    border-radius: 0.4rem;
    opacity: 0.2;
  }
`;

export default CardPlaceholder;
