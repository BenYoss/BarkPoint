import React from 'react';
import axios from 'axios';

const GoogleLogin = () => (
  <div>
    <h1>BarkPoint</h1>
    <img src="https://i.ibb.co/zRR5Nd4/barkpoint.png" alt="" />
    <button type="submit" onClick={ () => { window.location.href = 'http://localhost:8080/auth/google' }}> click me</button>
  </div>
);

export default GoogleLogin;
