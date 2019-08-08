import React from 'react';

import './style.css';

// components
import StarDisplay from '../stardisplay';
import Number from '../number';

//utils
import { sum, range, random, randomSumIn } from '../../utils';

const StarMatch = () => {
  const [stars, setStars] = React.useState(random(1, 9));
  const [availableNums, setAvailableNums] = React.useState([1, 2, 3, 4, 5]);
  const [candidateNums, setCandidateNums] = React.useState([2, 3]);

  const candidatesAreWrong = sum(candidateNums) > stars;

  const numberStatus = number => {
    if (!availableNums.includes(number)) {
      return 'used';
    }

    if (candidateNums.includes(number)) {
      return candidatesAreWrong ? 'wrong' : 'candidate';
    }

    return 'available';
  };

  //candidateNUms
  //wrongNUmbs
  //usedNums
  //availableNums

  return (
    <>
      <div>
        <h1>Pick 1 or more numbers that sum to the number of stars</h1>
      </div>
      <section className="game-container">
        <StarDisplay count={stars} />

        <div className="numbers-container">
          {range(1, 9).map(number => (
            <Number
              key={number}
              number={number}
              status={numberStatus(number)}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default StarMatch;
