import React from 'react';

const Joke = props => {
  return (
    <div>
      Riddle! {props.joke.setup}
      <br />
      answer: {props.joke.punchline}
      <br />
    </div>
  );
};

export default Joke;
