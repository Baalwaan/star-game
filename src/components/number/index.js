import React from 'react';

import colors from './colors';
import './style.css';

const PlayNumbers = props => (
  <button
    className="number"
    style={{ backgroundColor: colors[props.status] }}
    onClick={() => console.log('Num', props.number)}
  >
    {props.number}
  </button>
);

export default PlayNumbers;
