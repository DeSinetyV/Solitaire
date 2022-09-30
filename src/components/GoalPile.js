import { React} from 'react';
import CardPlaceholder from './CardPlaceholder';

function GoalPile(pile, setSelectedCards, selectedCards, pileIndex) {

 
  return (
    <div
      onClick={() => {
        setSelectedCards((prev) => [...prev, pileIndex]);
      }}
    >
      <CardPlaceholder />
    </div>
  );
}

export default GoalPile