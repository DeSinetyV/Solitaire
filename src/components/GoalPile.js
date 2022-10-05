import {useState, useEffect} from 'react';
import { React} from 'react';
import { addSelectedToCards, arrangingGoalCards } from '../utils';
// import  {arrangingGoalCards} from '../utils';
import Card from './Card';
import styled from 'styled-components';
import CardPlaceholder from './CardPlaceholder';

function GoalPile({category, setSelectedCards, selectedCards, pileIndex,carts, setCarts}) {

  const [cards, setCards] = useState([]);
  
  const [lastPileCard, setLastPileCards] = useState({id:0});


  const  [addToGoalPile,setAddToGoalPile] = useState(false)


 // console.log('1',{selectedCards})
  useEffect(() => {

    console.log(addToGoalPile);
if(selectedCards.length > 0 && addToGoalPile){
     console.log(lastPileCard);
     console.log( selectedCards[0].id);
     console.log(selectedCards[0].category);
      console.log(selectedCards)




        if (
          selectedCards[0].id === lastPileCard.id + 1 &&
          selectedCards[0].category === category
        ) {
        arrangingGoalCards(carts, selectedCards, setCarts);
          setCards(prev => [...prev, selectedCards[0]])
          setSelectedCards([]);
          setAddToGoalPile(false);
        } else if (selectedCards.length > 1) {
          setAddToGoalPile(false);
          // setSelectedCards([]);
        }
      
    }

    if( cards.length >0 ){
      setLastPileCards([...cards].pop())
    }
  }, [selectedCards, cards, category, lastPileCard,setSelectedCards,addToGoalPile,carts,setCarts]);
  // console.log(cards);



if (cards.length > 0 ){

    return (
      <Pile >

          <Card
            key={`${lastPileCard.id}${lastPileCard.category}`}
            cart={lastPileCard}
            setAddToGoalPile={setAddToGoalPile}
            // cartIndex={i.toString()}
            setSelectedCards={setSelectedCards}
          />

      </Pile>
    );
  }
  return (
    <div className='test'
    onClick={() => { setAddToGoalPile(true)   }}>
      <CardPlaceholder category ={category} />
    </div>
  );
}

const Pile = styled.div`
  height: 200px;
  width: 100px;
  position: relative;
`;

export default GoalPile