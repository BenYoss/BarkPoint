import React from 'react';
// import ToyList from './ToyList';

const axios = require('axios');

const ToyBox = () => {
  const getToy = () => axios.get('/get/toys')
    .then((response) => {
      console.warn(response.data);
    })
    .catch((error) => {
      console.error(error);
    });

  return (
    <div>
      <button type="submit" onClick={() => getToy()}>This is a button</button>
    </div>
  );
};

export default ToyBox;
