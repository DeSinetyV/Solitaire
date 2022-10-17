import { distributeCarts } from './utils';

export const setCards = () => {
  const setData = (color, category) => {
    let arr = [];
    for (let i = 1; i < 14; i++) {
      arr.push({
        id: `${i}-${category}`,
        number: i,
        color: color,
        category: category,
        image: `${category}${i < 10 ? '0' + i : i}.png`,
      });
    }
    return arr;
  };
  const clubs = setData('black', 'clubs');
  const diamonds = setData('red', 'diamonds');
  const hearts = setData('red', 'hearts');
  const spades = setData('black', 'spades');
  const CARDS = [...clubs, ...diamonds, ...hearts, ...spades];

  function shuffleArray(arr) {
    arr.sort(() => Math.random() - 0.5);
  }
  shuffleArray(CARDS);
  return CARDS;
};

//goal Cards data

export const GOALCARDS = [
  { category: 'clubs', cards: [] },
  { category: 'diamonds', cards: [] },
  { category: 'hearts', cards: [] },
  { category: 'spades', cards: [] },
];

export function reInitialData(
  setCardsToArrange,
  setGoalCards,
  setPickPileCards,
) {
  const CARDS = [...setCards()];
  setCardsToArrange(distributeCarts(CARDS.slice(0, 28)));
  setGoalCards([...GOALCARDS]);
  setPickPileCards(CARDS.slice(28));
}
