import { React } from 'react';
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
  const { category, cards } = pile;
  const [{ isOver, canDrop }, dropTarget] = useDrop(
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
        canDrop: monitor.canDrop(),
      }),
    }),
    [cardsToArrange, pile],
  );

  if (cards.length > 0) {
    return (
      <Pile ref={dropTarget} isOver={isOver}>
        {cards.map((card, i) => (
          <Card
            key={card.id}
            canDrop={canDrop}
            isOver={isOver}
            goalCartIndex={i}
            card={card}
            setSelectedCards={setSelectedCards}
            selectedCards={selectedCards}
          />
        ))}
      </Pile>
    );
  }
  return (
    <PlaceHolderFrame
      isOver={isOver}
      canDrop={canDrop}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedCards((prev) => [...prev, category]);
      }}
      ref={dropTarget}
    >
      <CardPlaceholder category={category} />
    </PlaceHolderFrame>
  );
}

const Pile = styled.div`
  width: 100px;
  position: relative;
  box-shadow: ${({ isOver, canDrop }) =>
    canDrop && isOver
      ? '0 0 10px rgba(0, 255, 0, 1)'
      : isOver
      ? '0 0 10px orange'
      : 'none'};
`;
const PlaceHolderFrame = styled.div`
  cursor: pointer;
  border-radius: 0.6rem;
  box-shadow: ${({ isOver, canDrop }) =>
    canDrop && isOver
      ? '0 0 10px rgba(0, 255, 0, 1)'
      : isOver
      ? '0 0 10px orange'
      : 'none'};
`;
export default GoalPile;
