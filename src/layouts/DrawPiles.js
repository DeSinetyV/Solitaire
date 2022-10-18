import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import styled from 'styled-components';
import CardPlaceholder from '../components/CardPlaceholder';

function Draw({ pickPile, setSelectedCards, selectedCards, boardClick }) {
  const [compteur, setCompteur] = useState(0);

  useEffect(() => {
    if (compteur === pickPile.length) {
      // Retour à 0 du compteur
      setCompteur(0);
    }
  }, [compteur, pickPile]); // Compteur -> boucler sur les cartes de la pioche
  const pickCart =
    compteur === pickPile.length ? pickPile[0] : pickPile[compteur]; // Affichage quand la pile est vide
  if (pickCart) {
    pickCart.displayed = true; // Affiche la carte
  }

  return (
    <Container>
      <PickPile>
        <div
          onClick={() =>
            pickPile.length > 0 ? setCompteur((prev) => prev + 1) : ''
          }
        >
          {pickPile.map((card, i) => {
            return (
              <PileCard key={i} index={i}>
                <img
                  className='cart'
                  src='images/CardsFaces/back_card.jpg'
                  alt={card.id}
                />
              </PileCard>
            );
          })}
        </div>
      </PickPile>
      {pickPile.length > 0 ? (
        <CardFrame>
          <Card
            card={pickCart}
            setSelectedCards={setSelectedCards}
            selectedCards={selectedCards}
            boardClick={boardClick}
          />
        </CardFrame>
      ) : (
        <CardFrame>
          <CardPlaceholder />
        </CardFrame>
      )}
    </Container>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
`;
const PileCard = styled.div`
  .cart {
    cursor: pointer;
    width: 100px;
    height: 145px;
    border: 2px white solid;
    border-radius: 0.6rem;
  }
  position: absolute;
  top: ${({ index }) => `${index / 3}px`};
  left: ${({ index }) => `${index / 3}px`};
`;

const PickPile = styled.div`
  position: relative;
  top: -5px;
`;
const CardFrame = styled.div``;
export default Draw;
