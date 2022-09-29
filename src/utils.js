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
  resultArr.map((pile) => (pile[pile.length - 1].displayed = true));
  return resultArr;
}

export function arrangingCards(cards, selectedCards) {
  let arr = [];
  cards.map((pile) => {
    if (pile.includes(selectedCards[0])) {
      arr = pile.slice(pile.indexOf(selectedCards[0]));
    }
    return pile;
  });
  const res = cards.map((pile) => {
    if (pile.includes(selectedCards[0])) {
      pile.splice(pile.indexOf(selectedCards[0]));
    }
    if (pile.includes(selectedCards[1])) {
      pile = [...pile, ...arr];
    }
    if (pile.length > 0 && !pile[pile.length - 1].displayed) {
      pile[pile.length - 1].displayed = true;
    }
    return pile;
  });
  return res;
}
