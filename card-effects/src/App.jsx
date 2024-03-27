import React, { useState, useEffect } from 'react';
import Deck from './deck';

function CardApp() {
  const [deckId, setDeckId] = useState(null);
  const [remaining, setRemaining] = useState(null);
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNewDeck();
  }, []);

  const fetchNewDeck = () => {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(response => response.json())
      .then(data => {
        setDeckId(data.deck_id);
        setRemaining(data.remaining);
        setCards([]);
        setError(null);
      })
      .catch(error => console.error('Error fetching new deck:', error));
  };

  const drawCard = () => {
    if (remaining === 0) {
      setError('Error: no cards remaining!');
      return;
    }

    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
      .then(response => response.json())
      .then(data => {
        if (data.remaining === 0) {
          setError('Error: no cards remaining!');
          return;
        }
        setRemaining(data.remaining);
        setCards([...cards, data.cards[0]]);
        setError(null);
      })
      .catch(error => console.error('Error drawing card:', error));
  };

  return (
    <div>
      {error && <div>{error}</div>}
      <Deck
        deckId={deckId}
        remaining={remaining}
        drawCard={drawCard}
        fetchNewDeck={fetchNewDeck}
      />
      <div>
        {cards.map((card, index) => (
          <img key={index} src={card.image} alt={card.code} style={{ maxWidth: '100px' }} />
        ))}
      </div>
    </div>
  );
}

export default CardApp;

