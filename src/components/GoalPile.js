import { useState, useEffect } from 'react';
import { React } from 'react';
import { addSelectedToCards, arrangingGoalCards } from '../utils';
import Card from './Card';
import styled from 'styled-components';
import CardPlaceholder from './CardPlaceholder';
import { useDrop } from 'react-dnd';

function GoalPile({
  category,
  setSelectedCards,
  selectedCards,
  pileIndex,
  carts,
  setCarts,
}) {
  const [cards, setCards] = useState([]);


  const [lastPileCard, setLastPileCards] = useState({ number: 0 });

  const [addToGoalPile, setAddToGoalPile] = useState(false);

  const [dragCard, setDragCard] = useState(null);

  const [{ isOver, draggingCard }, dropTarget] = useDrop(
    () => ({
      accept: 'CARD',
      drop: (item) => {
          setDragCard(item)
          setCards(prev =>[...prev,item])
  console.log(item)

      },
      canDrop: (item) => {
        if (cards.length === 0 && item.number === 1 ) {
          return true;
        } else {
          return (
            item.number - 1 === cards[cards.length - 1].number &&
            item.category === cards[cards.length - 1].category
          );
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        draggingCard: monitor.getItem(),
      }),
    }),
    [cards],
  );

  useEffect(() =>{
    if (dragCard){
     const newCarts = carts.map(pile => pile.filter(cart=> cart.id !== dragCard.id))
     setCarts(newCarts)
     setDragCard(null)
    }
    
  },[carts, setCarts,dragCard,setDragCard])
  useEffect(() => {
    // console.log(addToGoalPile);
    if (selectedCards.length > 0 && addToGoalPile) {


      if (
        selectedCards[0].number === lastPileCard.number + 1
         &&
        selectedCards[0].category === category
      ) {
        arrangingGoalCards(carts, selectedCards, setCarts);
        setCards((prev) => [...prev, selectedCards[0]]);
        setSelectedCards([]);
        setAddToGoalPile(false);
      } else {
        setAddToGoalPile(false);
        setSelectedCards([]);
      }
    }

    if (cards.length > 0) {
      setLastPileCards([...cards].pop());
    }
  }, [
    selectedCards,
    cards,
    category,
    lastPileCard,
    setSelectedCards,
    addToGoalPile,
    carts,
    setCarts,
  ]);


  if (cards.length > 0) {
    return (
      <Pile 
      ref={dropTarget}>
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
    <div
    ref={dropTarget}
      onClick={() => {
        setAddToGoalPile(true);
      }}
    >
      <CardPlaceholder category={category} />
    </div>
  );
}

const Pile = styled.div`
  height: 200px;
  width: 100px;
  position: relative;
`;

export default GoalPile;
