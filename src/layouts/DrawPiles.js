import React, { useState } from 'react';
import Card from '../components/Card';
import CardDraw from '../components/DrawPile';
import styled from 'styled-components';


function Draw({drawCard}) {
    const [pickPile, setPickPile] = useState([...drawCard])
    const [drawPile, setDrawPile] = useState([])
    const [compteur, setCompteur] = useState(0)

    return (
            <div>
               <PileCard className='cart'  onClick={() => setCompteur(prev => prev+1)}><img className='cart' src='../../images/CardsFaces/back_card.jpg' alt = 'back' /></PileCard>
                <DrawCard>
                    <Card cart={pickPile[compteur].displayed='enabled'}/>
                </DrawCard>
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