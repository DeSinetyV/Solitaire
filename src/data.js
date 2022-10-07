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

export const clubs = setData('black', 'clubs');
export const diamonds = setData('red', 'diamonds');
export const hearts = setData('red', 'hearts');
export const spades = setData('black', 'spades');

export const CARDS = [...clubs, ...diamonds, ...hearts, ...spades];

function shuffleArray(arr) {
  arr.sort(() => Math.random() - 0.5);
}
shuffleArray(CARDS);
