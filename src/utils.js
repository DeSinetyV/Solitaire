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
    pile[pile.length - 1].displayed = true;
    return pile;
  });
  return resultArr;
}
// arranging cards from a pile to another pile by (adding and removing cards)
export function arrangingCards(cards, selectedCards, setCards) {
  let arr = [];
  if (
    (selectedCards[0].number + 1 === selectedCards[1].number &&
      selectedCards[0].color !== selectedCards[1].color) ||
    typeof selectedCards[1] === 'number'
  ) {
    cards.map((pile) => {
      if (pile.includes(selectedCards[0])) {
        arr = pile.slice(pile.indexOf(selectedCards[0]));
        arr = arr.map((card) => {
          delete card.selected;
          return card;
        });
        const res = cards.map((pile, i) => {
          if (pile.includes(selectedCards[0])) {
            pile.splice(pile.indexOf(selectedCards[0]));
          }
          if (pile.includes(selectedCards[1]) || selectedCards[1] === i) {
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

//  select the same card with double click and inserting to goal piles
export const insertToGoalPileWithClick = (
  setGoalCards,
  selectedCards,
  pickPileCards,
  setPickPileCards,
  setCardsToArrange,
) => {
  setGoalCards((prev) =>
    prev.map((pile) => {
      const { category, cards } = pile;
      if (
        category === selectedCards[0].category &&
        (selectedCards[0].number === 1 ||
          cards[cards.length - 1]?.number + 1 === selectedCards[0].number)
      ) {
        pile = {
          category: category,
          cards: [...cards, selectedCards[0]],
        };
        pickPileCards.indexOf(selectedCards[0]) !== -1
          ? setPickPileCards((prev) =>
              prev.filter((card) => card.id !== selectedCards[0].id),
            )
          : setCardsToArrange((prev) =>
              prev.map((pile) => {
                let newPile = pile.filter(
                  (card) => card.id !== selectedCards[0].id,
                );
                if (
                  newPile.length > 0 &&
                  !Object.hasOwn(newPile[newPile.length - 1], 'displayed')
                ) {
                  newPile[newPile.length - 1].displayed = true;
                }
                return newPile;
              }),
            );
      }
      return pile;
    }),
  );
};

//from arranging piles or pick pile to goal piles
export const insertToGoalPile = (
  selectedCards,
  setGoalCards,
  setPickPileCards,
  setCardsToArrange,
  pickPileCards,
) => {
  if (
    (selectedCards[1] === selectedCards[0].category &&
      selectedCards[0].number === 1) ||
    (selectedCards[0].number === selectedCards[1].number + 1 &&
      selectedCards[0].category === selectedCards[1].category)
  ) {
    setGoalCards((prev) =>
      prev.map((pile) => {
        if (
          pile.category === selectedCards[1] ||
          pile.category === selectedCards[0].category
        ) {
          pile = {
            category: selectedCards[0].category,
            cards: [...pile.cards, selectedCards[0]],
          };
          pickPileCards.indexOf(selectedCards[0]) !== -1
            ? setPickPileCards((prev) =>
                prev.filter((card) => card.id !== selectedCards[0].id),
              )
            : setCardsToArrange((prev) =>
                prev.map((pile) => {
                  let newPile = pile.filter(
                    (card) => card.id !== selectedCards[0].id,
                  );
                  if (
                    newPile.length > 0 &&
                    !Object.hasOwn(newPile[newPile.length - 1], 'displayed')
                  ) {
                    newPile[newPile.length - 1].displayed = true;
                  }
                  return newPile;
                }),
              );
        }
        return pile;
      }),
    );
  }
};

//insert cards to arranging piles from goal piles or pick pile
export const insertToCardsToArrange = (
  selectedCards,
  setCardsToArrange,
  setPickPileCards,
  setGoalCards,
  pickPileCards,
) => {
  if (
    (selectedCards[0].number + 1 === selectedCards[1].number &&
      selectedCards[0].color !== selectedCards[1].color) ||
    typeof selectedCards[1] === 'number'
  ) {
    setCardsToArrange((prev) =>
      prev.map((pile, i) => {
        if (pile.indexOf(selectedCards[1]) !== -1) {
          pile = [...pile, selectedCards[0]];
        }
        if (i === selectedCards[1]) {
          pile = [...pile, selectedCards[0]];
        }
        return pile;
      }),
    );
    pickPileCards.indexOf(selectedCards[0]) !== -1
      ? setPickPileCards((prev) =>
          prev.filter((card) => card.id !== selectedCards[0].id),
        )
      : setGoalCards((prev) =>
          prev.map((pile) =>
            pile.cards.indexOf(selectedCards[0]) !== -1
              ? {
                  category: pile.category,
                  cards: pile.cards.filter(
                    (card) => card.id !== selectedCards[0].id,
                  ),
                }
              : pile,
          ),
        );
  }
};

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

//  "homepage": "https://Sifelddin.github.io/solitaire_react",
