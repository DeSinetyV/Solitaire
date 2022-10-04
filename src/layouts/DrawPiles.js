import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import styled from 'styled-components';
import '../style/Pile.css'
import { arrangingCards } from '../utils';




function Draw({selectedCards,setSelectedCards,drawCard, boardClick, setBoardClick}) {
    const [pickPile, setPickPile] = useState([...drawCard])
    const [compteur, setCompteur] = useState(0)


    if(compteur === pickPile.length) {
        setCompteur(0)
    }
    const pickCards = compteur === pickPile.length ? pickPile[0] : pickPile[compteur]
    pickCards.displayed=true

    useEffect(() => {
        if (selectedCards.length === 2) {
          arrangingCards(pickPile, selectedCards, setPickPile);
          setSelectedCards([]);
        }
        if (boardClick) {
          if (selectedCards.length > 0) {
            setSelectedCards([]);
          }
          setBoardClick(false);
        }
      }, [setSelectedCards,selectedCards, pickPile, boardClick, setBoardClick]);
    return (
            <div className="pile">
               <PileCard className='cart'  onClick={() => setCompteur(prev => prev+1)}><img className='cart' src='../../images/CardsFaces/back_card.jpg' alt = 'back' /></PileCard>
            
                <Card
                cart={pickCards} 
                setSelectedCards={setPickPile} 
                />
            
            </div>
      );
}

const PileCard = styled.div`
.cart{
cursor : pointer;
width: 150px;
height: 217px;
border: 2px white solid;
border-radius: 0.6rem;
}
`;


export default Draw
