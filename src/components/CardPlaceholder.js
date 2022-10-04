import React from 'react';
import styled from 'styled-components';

function CardPlaceholder() {
  return <Placeholder />;
}

const Placeholder = styled.div`
  width: 100px;
  height: 150px;
  border: 2px orange solid;
  border-radius: 0.6rem;
`;

export default CardPlaceholder;
