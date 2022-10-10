import { useState, useEffect,useRef } from 'react';
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
  goalCards,
  setGoalCards
}) {
  const [cards, setCards] = useState([]);


  const [lastPileCard, setLastPileCards] = useState({ number: 0 });

  const [addToGoalPile, setAddToGoalPile] = useState(false);
  const dragCards = useRef(null);
  const [dragCard, setDragCard] = useState(null);

  const [{ isOver, draggingCard }, dropTarget] = useDrop(
    () => ({
      accept: 'CARD',
      drop: (item) => {
          setDragCard(item)
          setCards(prev =>[...prev,item])
          console.log(dragCards.current)
  console.log(item)

      },
      canDrop: (item) => {
        if (cards.length === 0 && item.number === 1 ) {
          return true;
        } else if (cards.length >=1) {
          console.log('coucou')
          console.log(carts)
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
//       setCards(prev => prev.filter(cart=> cart.id !== dragCard.id))
console.log(cards);

    const pile = carts.map(pile =>{
      if(pile.includes(dragCard)){
        if(pile.length >= 2 ) pile[pile.length-2].displayed = true
        // console.log(pile[pile.length-2])
      

      }})


     const newCarts = carts.map(pile => pile.filter(cart=> cart.id !== dragCard.id))
     setCarts(newCarts)
     setDragCard(null)
    }
    
  },[carts, setCarts,dragCard,setDragCard,cards])

  
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
    console.log(category,' : ', cards.length, cards)
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
