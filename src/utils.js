// this function is set for distribute cards on Arrangement piles
export function distributeCarts(arr) {
  let count = 0;
  let resultArr = [];
  for (let i = 0; i <= 7; i++) {
    count += i;
    if (count > 0) {
      resultArr.push(arr.slice(count - i, count));
    }
  }
  resultArr.map((pile) => {
    // if(!pile[pile.length - 1].hasOwnProperty('displayed')) 
    pile[pile.length - 1].displayed = true
  return pile;
  })
  return resultArr;
}
// arranging cards from a pile to another pile by (adding and removing cards)
export function arrangingCards(cards, selectedCards, setCards) {
  let arr = [];
  if (
    (selectedCards[0].number + 1 === selectedCards[1].number &&
      selectedCards[0].color !== selectedCards[1].color) ||
    typeof selectedCards[1] === 'string'
  ) {
    cards.map((pile) => {
      if (pile.includes(selectedCards[0])) {
        arr = pile.slice(pile.indexOf(selectedCards[0]));
      }
      return pile;
    });
    const res = cards.map((pile, i) => {
      if (pile.includes(selectedCards[0])) {
        pile.splice(pile.indexOf(selectedCards[0]));
      }
      if (
        pile.includes(selectedCards[1]) ||
        selectedCards[1] === i.toString()
      ) {
        pile = [...pile, ...arr];
      }
      // display the last card of each pile by adding displayed property
      if (pile.length > 0 && !pile[pile.length - 1].displayed) {
        pile[pile.length - 1].displayed = true;
      }
      return pile;
    });
    setCards(res);
  }
}

// export function arrangingGoalCards(cards, selectedCards, setCards) {
//   let arr = [];
//   // if (
//   //   (selectedCards[0].id === selectedCards[1].id + 1 &&
//   //     selectedCards[0].category === selectedCards[1].category) ||
//   //   typeof selectedCards[1] === 'string'
//   // ) {
//     console.log(cards)

export function arrangingGoalCards(cards, selectedCards, setCards) {
  console.log(cards);
  console.log(selectedCards);
  console.log(selectedCards[0]);

  let arr = [];
  // if (
  //   (selectedCards[0].id === selectedCards[1].id + 1 &&
  //     selectedCards[0].category === selectedCards[1].category) ||
  //   typeof selectedCards[1] === 'string'
  // ) {
  console.log(cards);

  cards.map((pile) => {
    if (pile.includes(selectedCards[0])) {
      console.log(pile);
      arr = pile.pop();
      console.log(arr);
      if (pile.length > 0) pile[pile.length - 1].displayed = true;
    }
    return pile;
  });

  // const res = cards.map((pile, i) => {
  //   if (pile.pop()) {
  //     pile.splice(pile.indexOf(selectedCards[0]));
  //   }
  //   // if (
  //   //   pile.includes(selectedCards[1]) ||
  //   //   selectedCards[1] === i.toString()
  //   // ) {
  //   //   pile = [...pile, ...arr];
  //   // }
  //   // display the last card of each pile by adding displayed property
  //   // if (pile.length > 0 && !pile[pile.length - 1].displayed) {
  //   //   pile[pile.length - 1].displayed = true;
  //   // }
  //   return pile;
  // });
  // setCards(res);
}
// }

// add selected property to the displayed cards for highlighting them
export function addSelectedToCards(pile, selectedCards) {
  pile.map((card, i) => {
    if (i >= pile.indexOf(selectedCards[0])) {
      card.selected = true;
    }
    return card;
  });
}

/////////////

/////////////////

//Drag && Drop
// extract a card and its below cards as an array to add it to the drop Pile
export function dragCardsList(draggingCard, cards) {
  let sliced = null;
  if (draggingCard) {
    cards.map((p) => {
      if (p.some((card) => draggingCard.id === card.id)) {
        sliced = p.slice(p.indexOf(draggingCard));
      }
      return p;
    });
  }
  return sliced;
}
export function removeExtractedCards(cards, setCards, dragCards, indexPile) {
  let newCards = cards.map((pile, i) => {
    if (
      indexPile !== i.toString() &&
      pile.some((card) => card.id === dragCards.current[0].id)
    ) {
      pile.splice(pile.indexOf(dragCards.current[0]));
      if (pile.length > 0) {
        pile[pile.length - 1].displayed = true;
      }
      return pile;
    }
    return pile;
  });
  setCards(newCards);
}
