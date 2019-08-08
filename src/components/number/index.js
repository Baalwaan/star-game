import React from 'react';

import './style.css';

const Numbers = props => (
  <button className="number" onClick={() => console.log('Num', props.number)}>
    {props.number}
  </button>
);

export default Numbers;
