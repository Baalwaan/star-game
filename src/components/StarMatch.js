import React from 'react';

import { sum, range, random, randomSumIn } from '../utils';

const StarMatch = () => {
  const [stars, setStars] = React.useState(random(1, 9));

  return (
    <>
      <div>
        <h1>Pick 1 or more numbers that sum to the number of stars</h1>
      </div>

      <div className="left">
        {range(1, stars).map(starId => (
          <div key={starId} className="star">
            ☆
          </div>
        ))}
        <div />
      </div>
    </>
  );
};

export default StarMatch;
