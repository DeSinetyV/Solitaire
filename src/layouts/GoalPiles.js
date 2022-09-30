import React from 'react';
import {useState, useEffect} from 'react';
import styled from 'styled-components';
import ArrangePile from '../components/ArrangePile';
import CardPlaceholder from '../components/CardPlaceholder';
import GoalPile from '../components/GoalPile';
import { arrangingCards } from '../utils';

function GoalPiles(selectedCards,setSelectedCards) {
  const [cards, setCards] = useState ([[],[],[],[]]);
 console.log('1',{selectedCards})
  useEffect(() => {

    if (selectedCards.length === 2) {
      if (
        selectedCards[0].id === selectedCards[1].id + 1 &&
        selectedCards[0].category === selectedCards[1].category
      ) {
        setCards(arrangingCards(cards, selectedCards));
        setSelectedCards([]);
      } else {
        setSelectedCards([]);
      }
    }
  }, [selectedCards, cards]);




  // return (
  //   <Container>
  //     <GoalPile />
  //     <CardPlaceholder />
  //     <CardPlaceholder />
  //     <CardPlaceholder />
  //     <CardPlaceholder />
  //   </Container>
  // );

  return (
    <Container>
      {cards?.map((pile, i) => {
        return (
          <ArrangePile
            key={i}
            pile={pile}
            pileIndex={i.toString()}
            setSelectedCards={setSelectedCards}
            selectedCards={selectedCards}
          />
        );
      })}
    </Container>
  );
}
// return (
//   <Container>
//     {cards?.map((pile, i) => {
//       return (
//         <GoalPile
//           key={i}
//           pile={pile}
//           pileIndex={i.toString()}
//           setSelectedCards={setSelectedCards}
//           selectedCards={selectedCards}
//         />
//       );
//     })}
//   </Container>


const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
  width:67%;
`;

export default GoalPiles;
