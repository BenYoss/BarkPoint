import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GoogleLogin from './GoogleLogin';
import PersonalityAssessment from './PersonalityAssessment';
import Profile from './Profile';
import ToyBox from './ToyBox';

import Park from './Park';
import Form from './Form';

const App = () => {
  const [active, setActive] = useState(false);
  const [aggressive, setAggressive] = useState(false);
  const [outgoing, setOutgoing] = useState(false);
  const [name, setName] = useState('');
  const [form, setForm] = useState({
    size: 'medium', breed: '', number: '', dogname: '', personalitytypes: [outgoing, aggressive, active], image: '',
  });

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
          <Profile />
        </Route>
        <Route path="/toybox">
          <ToyBox
            active={active}
            outgoing={outgoing}
            aggressive={aggressive}
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
      </Switch>
    </Router>
  );
};

export default App;
