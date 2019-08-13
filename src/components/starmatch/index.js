import React from 'react';

import './style.css';

// components
import StarDisplay from '../stardisplay';
import PlayNumber from '../number';
import PlayAgain from '../playagain';

//utils
import { sum, range, random, randomSumIn } from '../../utils';

const Game = props => {
  const [stars, setStars] = React.useState(random(1, 9));
  const [availableNums, setAvailableNums] = React.useState(range(1, 9));
  const [candidateNums, setCandidateNums] = React.useState([]);
  const [secondsleft, setSecondsLeft] = React.useState(10);

  //sesetTimeout

  React.useEffect(() => {
    if (secondsleft > 0 && availableNums.length > 0) {
      //only intro new time if seconds left are greater than 0
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsleft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  });

  const candidatesAreWrong = sum(candidateNums) > stars;
  // const gameIsDone = availableNums.length === 0;

  const gameStatus =
    availableNums.length === 0 ? 'won' : secondsleft === 0 ? 'lost' : 'active';

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

  const onNumberClick = (number, currentStatus) => {
    if (gameStatus !== 'active' && currentStatus === 'used') {
      return;
    }
    //candidatenumbers
    const newCandidateNums =
      currentStatus === 'available'
        ? candidateNums.concat(number)
        : candidateNums.filter(cn => cn !== number);

    if (sum(newCandidateNums) !== stars) {
      setCandidateNums(newCandidateNums);
    } else {
      const newAvailableNums = availableNums.filter(
        n => !newCandidateNums.includes(n)
      );

      setStars(randomSumIn(newAvailableNums, 9)); // //redraw number of stars. only redraw number of stars that are still playable
      setAvailableNums(newAvailableNums);
      setCandidateNums([]);
    }
    //currentStatus => newStatus
  };

  return (
    <>
      <div>
        <h1>Pick 1 or more numbers that sum to the number of stars</h1>
      </div>
      <section className="game-container">
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
        <p>Seconds Remaining : {secondsleft}</p>
      </section>
    </>
  );
};

const StarMatch = () => {
  const [gameId, setGameId] = React.useState(1);
  return <Game key={gameId} startNewGame={() => setGameId(gameId + 1)} />;
};

export default StarMatch;
