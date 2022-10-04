import React from 'react';
import PickPile from '../components/PickPile';
import styled from 'styled-components';


function PickPiles({pickPileCards}) {

  return (<Pick>
    <PickPile></PickPile>
  </Pick>)
}

const Pick = styled.div`
  cursor : pointer;
  width: 4rem;
  img {
    width: 150px;
    border-radius: 0.4rem;
  }
`;
export default PickPiles;
