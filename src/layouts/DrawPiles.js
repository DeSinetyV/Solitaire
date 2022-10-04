import React, { useState } from 'react';
import Card from '../components/Card';
import CardDraw from '../components/DrawPile';
import styled from 'styled-components';

function Draw({ drawCard }) {
  const [pickPile, setPickPile] = useState([...drawCard]);
  const [drawPile, setDrawPile] = useState([]);
  const [compteur, setCompteur] = useState(0);

  console.log(compteur);
  console.log(pickPile);

  if (compteur === pickPile.length) {
    setCompteur(0);
  }
  const pickCart =
    compteur === pickPile.length ? pickPile[0] : pickPile[compteur];
  pickCart.displayed = true;
  return (
    <Container>
      <PileCard onClick={() => setCompteur((prev) => prev + 1)}>
        <img
          className='cart'
          src='../../images/CardsFaces/back_card.jpg'
          alt='back'
        />
      </PileCard>

      <Card cart={pickCart} />
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 90%;
`;
const PileCard = styled.div`
  .cart {
    cursor: pointer;
    width: 100px;
    height: 150px;
    border: 2px white solid;
    border-radius: 0.6rem;
  }
`;

export default Draw;
