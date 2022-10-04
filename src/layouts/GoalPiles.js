import React from 'react';
import {useState, useEffect} from 'react';
import styled from 'styled-components';
import CardPlaceholder from '../components/CardPlaceholder';
import GoalPile from '../components/GoalPile';
// import { arrangingCards } from '../utils';

function GoalPiles({selectedCards,setSelectedCards}) {
  // const [cards, setCards] = useState ([]);

  const [categorys, setCategorys] = useState (['clubs','diamonds','hearts','spades']);



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
      {categorys?.map((category, i) => {
        return (
          <GoalPile 
            key={i}
            category={category}
            pileIndex={i.toString()}
            selectedCards={selectedCards}
            setSelectedCards={setSelectedCards}
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
