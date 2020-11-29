import React from 'react';
import './GoogleLogin.css';
import GoogleButton from 'react-google-button';

const GoogleLogin = () => (
  <div>
    <h1 className="logo">
      BarkPoint🐾
    </h1>
    <div className="image-container">
      <img src="https://i.ibb.co/zRR5Nd4/barkpoint.png" alt="" />
    </div>
    <div className="google-button">
      <GoogleButton
        onClick={() => { window.location.href = '/auth/google/'; }}
        type="light"
        label="SignUp / SignIn"
      />
    </div>
  </div>
);

export default GoogleLogin;
