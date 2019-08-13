import React from 'react';
import './App.css';

import Game from './components/Game';

const StarMatch = () => {
  const [gameId, setGameId] = React.useState(1);
  return <Game key={gameId} startNewGame={() => setGameId(gameId + 1)} />;
};

function App() {
  return <StarMatch />;
}
export default App;
