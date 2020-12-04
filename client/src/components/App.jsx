import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import GoogleLogin from './LoginLogout/GoogleLogin';
import PersonalityAssessment from './AboutDog/PersonalityAssessment';
import Profile from './ProfileAndToys/Profile';
import ToyBox from './ProfileAndToys/ToyBox';
import LogOut from './LoginLogout/LogOut';
import './App.css';
import NotFound from './LoginLogout/FourOhFour';

import Park from './Park/Park';
import Form from './AboutDog/Form';

const App = () => {
  const [active, setActive] = useState(false);
  const [aggressive, setAggressive] = useState(false);
  const [outgoing, setOutgoing] = useState(false);
  const [name, setName] = useState('');
  const [dogs, setDogs] = useState([]);
  const [form, setForm] = useState({
    size: 'medium', breed: '', number: '', dogname: '', personalitytypes: [outgoing, aggressive, active], image: '',
  });

  const getDogs = () => {
    axios.get('session')
      .then((response) => {
        axios.get('/data/dog', { params: response.data })
          .then(({ data }) => {
            setDogs(data);
          }).catch((error) => {
            console.warn(error);
          });
      }).catch((error) => {
        console.warn(error);
      });
  };

  return (

    <Router>
      <Switch>
        <Route exact path="/">
          <GoogleLogin />
        </Route>
        <Route path="/assessment">
          <PersonalityAssessment
            setActive={setActive}
            setAggressive={setAggressive}
            setOutgoing={setOutgoing}
            name={name}
            form={form}
            setForm={setForm}
            active={active}
            outgoing={outgoing}
            aggressive={aggressive}

          />
        </Route>
        <Route path="/profile">
          <Profile
            dogs={dogs}
            setDogs={setDogs}
            getDogs={getDogs}
          />
        </Route>
        <Route path="/toybox">
          <ToyBox
            dogs={dogs}
            setDogs={setDogs}
            getDogs={getDogs}
          />
        </Route>
        <Route path="/park">
          <Park />
        </Route>
        <Route path="/form">
          <Form
            setName={setName}
            form={form}
            setForm={setForm}
          />
        </Route>
        <Route path="/logout">
          <LogOut />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
