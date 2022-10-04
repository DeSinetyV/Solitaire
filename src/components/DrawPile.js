import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { addSelectedToCards } from '../utils';
import Card from './Card';
import CardPlaceholder from './CardPlaceholder';


function CardDraw(pile, setSelectedCards, selectedCards, pileIndex) {
    if(pile.includes(selectedCards[0])){
        addSelectedToCards(pile,selectedCards)
    }
    else {
        pile.map((card) => delete card.selected)
    }

        
    }





export default CardDraw

