import React, { useState } from 'react';
import Card from '../components/Card';
import styled from 'styled-components';
import '../style/Pile.css'

function Draw({ pickPile,setSelectedCards}) {
  const [compteur, setCompteur] = useState(0); // Compteur -> boucler sur les cartes de la pioche

  if (compteur === pickPile.length) {  // Retour à 0 du compteur
    setCompteur(0);
  }
  const pickCart =
    compteur === pickPile.length ? pickPile[0] : pickPile[compteur]; // Affichage quand la pile est vide
  if(pickCart) {
    pickCart.displayed = true; // Affiche la carte 
  }
  return (
    <Container>
      <PileCard onClick={() => setCompteur((prev) => prev + 1)}> 
        <img
          className='cart'
          src='../../images/CardsFaces/back_card.jpg'
          alt='back'
        />
      </PileCard>

      <Card 
      cart={pickCart}
      setSelectedCards={setSelectedCards}
             />
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
