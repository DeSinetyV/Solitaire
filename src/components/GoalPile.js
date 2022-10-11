import { useState, useEffect } from 'react';
import { React } from 'react';
import { arrangingGoalCards } from '../utils';
import Card from './Card';
import styled from 'styled-components';
import CardPlaceholder from './CardPlaceholder';
import { useDrop } from 'react-dnd';

function GoalPile({
  setSelectedCards,
  selectedCards,
  pile,
  cardsToArrange,
  setCardsToArrange,
  setGoalCards,
  setPickPileCards,
  pickPileCards,
}) {
  const [addToGoalPile, setAddToGoalPile] = useState(false);
  const { category, cards } = pile;
  const [{ isOver }, dropTarget] = useDrop(
    () => ({
      accept: 'CARD',
      drop: (item) => {
        if (pickPileCards.indexOf(item) !== -1) {
          setPickPileCards((prev) =>
            prev.filter((card) => card.id !== item.id),
          );
        } else {
          const newCarts = cardsToArrange.map((pile) =>
            pile.filter((cart) => cart.id !== item.id),
          );
          setCardsToArrange(
            newCarts.map((pile) => {
              if (pile.length > 0) {
                if (!Object.hasOwn(pile[pile.length - 1], 'displayed')) {
                  pile[pile.length - 1].displayed = true;
                }
              }
              return pile;
            }),
          );
        }
        setGoalCards((prev) =>
          prev.map((pile) =>
            pile.category === category
              ? { category: category, cards: [...pile.cards, item] }
              : pile,
          ),
        );
      },
      canDrop: (item) => {
        if (
          cards.length === 0 &&
          item.number === 1 &&
          item.category === category
        ) {
          return true;
        } else {
          return (
            cards.length > 0 &&
            item.number - 1 === cards[cards.length - 1].number &&
            item.category === cards[cards.length - 1].category
          );
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [cardsToArrange],
  );

  useEffect(() => {
    if (selectedCards.length > 0 && addToGoalPile) {
      if (
        ((selectedCards[0].number === 1 && cards.length === 0) ||
          (selectedCards[0].number > 1 &&
            selectedCards[0].number + 1 === selectedCards[1].number)) &&
        selectedCards[0].category === category
      ) {
        arrangingGoalCards(cardsToArrange, selectedCards, setCardsToArrange);
        setGoalCards((prev) =>
          prev.map((pile) =>
            pile.category === category
              ? { category: category, cards: [...pile.cards, selectedCards[0]] }
              : pile,
          ),
        );
        setSelectedCards([]);
        setAddToGoalPile(false);
      } else {
        setAddToGoalPile(false);
        setSelectedCards([]);
      }
    }

    // if (cards.length > 0) {
    //   setLastPileCards([...cards].pop());
    // }
  }, [
    selectedCards,
    cards,
    category,
    setSelectedCards,
    addToGoalPile,
    cardsToArrange,
    setCardsToArrange,
    setGoalCards,
  ]);

  if (cards.length > 0) {
    return (
      <Pile ref={dropTarget}>
        <Card
          cart={cards[cards.length - 1]}
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
