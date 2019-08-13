import React from 'react';

import './style.css';

// components
import StarDisplay from '../stardisplay';
import PlayNumber from '../number';
import PlayAgain from '../playagain';

//utils
import { sum, range, random, randomSumIn } from '../../utils';

const StarMatch = () => {
  const [stars, setStars] = React.useState(random(1, 9));
  const [availableNums, setAvailableNums] = React.useState(range(1, 9));
  const [candidateNums, setCandidateNums] = React.useState([]);

  const candidatesAreWrong = sum(candidateNums) > stars;
  const gameIsDone = availableNums.length === 0;

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
    if (currentStatus === 'used') {
      console.log('used');
      return;
    }
    //candidatenumbers
    const newCandidateNums =
      currentStatus === 'available'
        ? candidateNums.concat(number)
        : candidateNums.filter(cn => cn !== number);

    if (sum(newCandidateNums) !== stars) {
      setCandidateNums(newCandidateNums);
      console.log('if');
    } else {
      console.log('else');
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
        {gameIsDone ? <PlayAgain /> : <StarDisplay count={stars} />}

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
      </section>
    </>
  );
};

export default StarMatch;
