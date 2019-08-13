import React from 'react';
import './style.css';

import StarDisplay from '../StarDisplay';
import PlayNumber from '../Number';
import PlayAgain from '../PlayAgain';

//utils
import { sum, range, random, randomSumIn } from '../../utils';

//customHook this is a stateful function because we going to extract logic and group states in a single function
//gd practice to name Hooks use! linters and formatters can use this hint that function is a custom hook function
//what we name func depends on what it does/ it is basically entire game state
const useGameState = () => {
  // initialise states
  const [stars, setStars] = React.useState(random(1, 9));
  const [availableNums, setAvailableNums] = React.useState(range(1, 9));
  const [candidateNums, setCandidateNums] = React.useState([]);
  const [secondsLeft, setSecondsLeft] = React.useState(10);

  React.useEffect(() => {
    if (secondsLeft > 0 && availableNums.length > 0) {
      //only intro new time if seconds left are greater than 0
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  });

  //this is a behaviour to transact on the states
  const setGameState = newCandidateNums => {
    if (sum(newCandidateNums) !== stars) {
      setCandidateNums(newCandidateNums);
    } else {
      const newAvailableNums = availableNums.filter(
        n => !newCandidateNums.includes(n)
      );

      setStars(randomSumIn(newAvailableNums, 9)); //redraw number of stars. only redraw number of stars that are still playable
      setAvailableNums(newAvailableNums);
      setCandidateNums([]);
    }
  };

  //expose things the game needs
  return { stars, availableNums, candidateNums, secondsLeft, setGameState };
};

// ^^^The above custom hook is a state manager

const Game = props => {
  const {
    stars,
    availableNums,
    candidateNums,
    secondsLeft,
    setGameState
  } = useGameState();

  const candidatesAreWrong = sum(candidateNums) > stars;

  const gameStatus =
    availableNums.length === 0 ? 'won' : secondsLeft === 0 ? 'lost' : 'active';

  const numberStatus = number => {
    //this function sets the color of the button depending on what it returns
    if (!availableNums.includes(number)) {
      return 'used';
    }

    if (candidateNums.includes(number)) {
      return candidatesAreWrong ? 'wrong' : 'candidate';
    }

    return 'available';
  };
  // setting states
  const onNumberClick = (number, currentStatus) => {
    if (gameStatus !== 'active' && currentStatus === 'used') {
      return;
    }
    const newCandidateNums =
      currentStatus === 'available'
        ? candidateNums.concat(number)
        : candidateNums.filter(cn => cn !== number);

    setGameState(newCandidateNums);
  };

  return (
    <section className="main-container">
      <h1>Pick 1 or more numbers that sum to the number of stars</h1>

      <div className="game-container">
        <div className="stars-container">
          {gameStatus !== 'active' ? (
            <PlayAgain onClick={props.startNewGame} gameStatus={gameStatus} />
          ) : (
            <StarDisplay count={stars} />
          )}
        </div>
        <div className="numbers-container">
          {range(1, 9).map(number => (
            <PlayNumber
              key={number}
              number={number}
              status={numberStatus(number)}
              onClick={onNumberClick}
            />
          ))}
        </div>
      </div>
      <p>Seconds Remaining : {secondsLeft}</p>
    </section>
  );
};

export default Game;
