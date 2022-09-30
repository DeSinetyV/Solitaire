import React from 'react';
import styled from 'styled-components';

function CardPlaceholder() {
  return <Placeholder />;
}

const Placeholder = styled.div`
  width: 150px;
  height: 217px;
  border: 2px orange solid;
  border-radius: 0.6rem;
`;

export default CardPlaceholder;
