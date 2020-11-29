import React from 'react';
import Navbar from './Navbar';

const axios = require('axios');

const ToyBox = () => {
  const getToy = () => axios.get('/get/toys')
    .then((response) => {
      console.warn(response.data);
    })
    .catch((error) => {
      console.warn(error);
    });

  return (
    <div>
      <Navbar />
      <button
        type="submit"
        onClick={
        () => getToy()
      }
      >
        This is a button
      </button>
    </div>
  );
};

export default ToyBox;
