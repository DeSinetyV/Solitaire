import React, { useState } from 'react';
import Card from '../components/Card';
import CardDraw from '../components/DrawPile';
import styled from 'styled-components';


function Draw({drawCard}) {
    const [pickPile, setPickPile] = useState([...drawCard])
    const [drawPile, setDrawPile] = useState([])
    const [compteur, setCompteur] = useState(0)
    
    console.log(compteur)
    console.log(pickPile)

    if(compteur === pickPile.length) {
        setCompteur(0)
    }
    const pickCart = compteur === pickPile.length ? pickPile[0] : pickPile[compteur]
    pickCart.displayed=true
    return (
            <div>
               <PileCard className='cart'  onClick={() => setCompteur(prev => prev+1)}><img className='cart' src='../../images/CardsFaces/back_card.jpg' alt = 'back' /></PileCard>
            
                    <Card cart={pickCart}/>
            
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

const DrawCard = styled.div`
cursor : pointer;
width: 150px;
height: 217px;
border: 2px white solid;
border-radius: 0.6rem;
`;

export default Draw

                {/* {pickPile.map(cart => {
                    return (
                        <Card          
                        key={`${cart.id}${cart.category}`}
                        cart={cart}
                        setSelectedCards={setPickPile} />
                    )
                })} */}