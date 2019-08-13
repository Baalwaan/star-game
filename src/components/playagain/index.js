import React from 'react';
import './style.css';

const PlayAgain = props => (
  <div>
    <p
      className="message"
      style={{ color: props.gameStatus === 'lost' ? 'red' : 'green' }}
    >
      {props.gameStatus === 'lost' ? 'Game Over!' : 'Nice!'}
    </p>
    <button onClick={props.onClick} className="newgame-button">
      Play Again!
    </button>
  </div>
);

export default PlayAgain;
