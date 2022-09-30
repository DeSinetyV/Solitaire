import React, { useEffect } from 'react'
import Card from './Card';


function GoalPile() {

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



  return (
    <div>GoalPile</div>
  )
}

export default GoalPile