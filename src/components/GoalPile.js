import {useState, useEffect} from 'react';
import { React} from 'react';
import { addSelectedToCards } from '../utils';
import Card from './Card';
import styled from 'styled-components';
import CardPlaceholder from './CardPlaceholder';

function GoalPile({category, setSelectedCards, selectedCards, pileIndex}) {

  const [cards, setCards] = useState([]);
  
  const [lastPileCard, setLastPileCards] = useState({id:0});


  const  [addToGoalPile,setAddToGoalPile] = useState(false)


 // console.log('1',{selectedCards})
  useEffect(() => {


if(selectedCards.length > 0 && addToGoalPile){


        if (
          selectedCards[0].id === lastPileCard.id + 1 &&
          selectedCards[0].category === category
        ) {
        // setCards(arrangingCards(cards, selectedCards));
        setCards(prev => [...prev, selectedCards[0]])
          setSelectedCards([]);
          setAddToGoalPile(false);
        } else {
          setAddToGoalPile(false);
          setSelectedCards([]);
        }
      
    }

    if( cards.length >0 ){
      setLastPileCards([...cards].pop())
    }
  }, [selectedCards, cards, category, lastPileCard,setSelectedCards,addToGoalPile]);
  // console.log(cards);
  console.log(lastPileCard);



if (cards.length > 0 ){
    return (
      <Pile>

          <Card
            key={`${lastPileCard.id}${lastPileCard.category}`}
            cart={lastPileCard}
            // cartIndex={i.toString()}
            setSelectedCards={setSelectedCards}
          />

      </Pile>
    );
  }
  return (
    <div 
    onClick={() => { setAddToGoalPile(true)   }}>{category}
      <CardPlaceholder />
    </div>
  );
}

const Pile = styled.div`
  height: 200px;
  width: 100px;
  position: relative;
`;

export default GoalPile