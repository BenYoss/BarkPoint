import React from 'react';
import PropTypes from 'prop-types';
import './Park.css';

const Locate = ({ panTo }) => (
  <button
    className="locate"
    type="submit"
    onClick={() => {
      navigator.geolocation.getCurrentPosition(
        (position) => panTo({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }),
        () => null,
      );
    }}
  >
    <img src="https://cdn.shopify.com/s/files/1/0082/3142/0009/products/Dog_Paw_Compass_SKU-02949-L_Black_800x.png?v=1549382505" alt="compass" />
  </button>
);

Locate.propTypes = {
  panTo: PropTypes.func.isRequired,
};

export default Locate;
