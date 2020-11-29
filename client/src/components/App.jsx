import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GoogleLogin from './GoogleLogin';
import PersonalityAssessment from './PersonalityAssessment';
import Profile from './Profile';
import ToyBox from './ToyBox';
import Park from './Park';
import Form from './Form';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <GoogleLogin />
      </Route>
      <Route path="/assessment">
        <PersonalityAssessment />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/toybox">
        <ToyBox />
      </Route>
      <Route path="/park">
        <Park />
      </Route>
      <Route path="/form">
        <Form />
      </Route>
    </Switch>
  </Router>

);

export default App;
