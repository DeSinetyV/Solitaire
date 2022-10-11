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
    //   if (!cards.includes(selectedCards[0]) && pile.includes(selectedCards[1])) {
    //   console.log('COUCOU');
    //   console.log(selectedCards[0]);
    //   console.log(pile);
    //   pile = [...pile,selectedCards[0]]
    //   console.log(pile);


    //   const res = cards.map((pile, i) => {
    //     if (pile.includes(selectedCards[1])) {
    //       pile = [...pile,selectedCards[0]]
    //       //  var test = selectedCards[0]
    //       // console.log(test)

    //       //  test.id -=  1

    //       arrangingGoalCards(cards, selectedCards)
    //     }
      
  
    //     // display the last card of each pile by adding displayed property
    //     if (pile.length > 0 && !pile[pile.length - 1].displayed) {
    //       pile[pile.length - 1].displayed = true;
    //     }
    //     return pile;
    //   });
    //   setCards(res);




    //   }
    //   else 
    if (pile.includes(selectedCards[0])) {
                      arr = pile.slice(pile.indexOf(selectedCards[0]));




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
      return pile;
  });
  }
}


export function arrangingGoalCards(cards, selectedCards, setCards) {


  let arr = [];


  cards.map((pile) => {
    if (pile.includes(selectedCards[0])) {
      arr = pile.pop();
      if (pile.length > 0) pile[pile.length - 1].displayed = true;
    }
    return pile;
  });
}

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
      if (p.indexOf(draggingCard) !== -1) {
        sliced = p.splice(p.indexOf(draggingCard));
        if (p.length > 0) {
          p = p[p.length - 1].displayed = true;
        }
      }
      return p;
    });
  }
  
  return sliced;
}
export function insertExtractedCards(cards, indexPile, draggingCards) {
  return cards.map((pile, i) =>
    indexPile === i.toString() ? (pile = [...pile, ...draggingCards]) : pile,
  );
}
