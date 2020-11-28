import React, { useEffect, useState } from 'react';
import ToyList from './ToyList';
const axios = require('axios');

const ToyBox = () => {

  const getToy = () => {
    return axios.get('/get/toys')
    .then((response) => {
      console.warn(response.data)
    })
    .catch((error) => {
      console.warn(error)
    })
  };

  return (
    <div>
      <button onClick={() => getToy()}>This is a button</button>
    </div>
  );
};

export default ToyBox;
