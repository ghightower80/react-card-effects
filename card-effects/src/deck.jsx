import React from 'react';

function Deck({ deckId, remaining, drawCard, fetchNewDeck }) {
    return (
        <div>
            <h1>Deck of Cards</h1>
            <button onClick={drawCard} disabled={remaining === 0}>Draw a Card</button>
            <button onClick={fetchNewDeck}>Shuffle</button>
            <p>Remaining: {remaining}</p>
        </div>
    );
}

export default Deck;
