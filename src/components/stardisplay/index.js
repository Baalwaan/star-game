import React from 'react';

import './style.css';

import { sum, range, random, randomSumIn } from '../../utils';

const StarDisplay = ({ count }) => (
  <>
    {range(1, count).map(starId => (
      <div key={starId} className="star">
        ☆
      </div>
    ))}
  </>
);

export default StarDisplay;
