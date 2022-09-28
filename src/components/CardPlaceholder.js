import React from 'react';
import styled from 'styled-components';

function CardPlaceholder() {
  return <Placeholder></Placeholder>;
}

const Placeholder = styled.div`
  width: 4rem;
  height: 6.5rem;
  border: 2px orange solid;
  border-radius: 0.6rem;
`;

export default CardPlaceholder;
