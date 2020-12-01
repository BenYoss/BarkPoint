/* eslint-disable react/prop-types */
import React, { useState, useMemo } from 'react';
import TinderCard from 'react-tinder-card';
import './PersonalityAssessment.css';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import PetsIcon from '@material-ui/icons/Pets';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const data = [
  {
    trait: 'Active',
    imgUrl: 'https://azure.wgp-cdn.co.uk/app-yourdog/posts/jumptrainingmain.jpg',
  },
  {
    trait: 'Aggressive',
    imgUrl: 'https://pages.wustl.edu/files/pages/dogbreeds/managed/agg.jpg',
  },
  {
    trait: 'Outgoing',
    imgUrl: 'https://mypetmatters.co.uk/wp-content/uploads/sites/119/2019/05/Dogs-playing.jpg',
  },
];

let dogsState = data;
const alreadySwiped = [];

const PersonalityAssessment = ({
  setActive, setAggressive, setOutgoing, name, form, setForm, active, outgoing, aggressive,
}) => {
  const history = useHistory();
  const [dogs, setDogs] = useState(data);
  const [lastDirection, setLastDirection] = useState();

  const childRefs = useMemo(() => Array(data.length).fill(0).map(() => React.createRef()), []);

  const swiped = (direction, trait) => {
    if (trait === 'Active' && direction === 'right') {
      setActive(true);
      setForm({ ...form, personalitytypes: [outgoing, aggressive, active] });
    } else if (trait === 'Outgoing' && direction === 'right') {
      setOutgoing(true);
      setForm({ ...form, personalitytypes: [outgoing, aggressive, active] });
    } else if (trait === 'Aggressive' && direction === 'right') {
      setAggressive(true);
      setForm({ ...form, personalitytypes: [outgoing, aggressive, active] });
    }
    setLastDirection(direction);
    alreadySwiped.push(trait);
    setForm({ ...form, personalitytypes: [outgoing, aggressive, active] });
  };

  const outOfFrame = (trait) => {
    dogsState = dogsState.filter((dog) => dog.trait !== trait);
    setDogs(dogsState);
  };

  const swipe = (dir) => {
    const cardsLeft = dogs.filter((dog) => !alreadySwiped.includes(dog.trait));
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].trait;
      const index = data.map((dog) => dog.trait).indexOf(toBeRemoved);
      alreadySwiped.push(toBeRemoved);
      childRefs[index].current.swipe(dir);
    }
  };
  return (
    <div>
      <h1 style={{
        textAlign: 'center',
        color: '#2CDA9D',
        fontFamily: 'Arvo',
        fontSize: '40px',
      }}
      >
        {`${name} is...`}
      </h1>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '5vh',
      }}
      >
        { dogs.map(({ trait, imgUrl }, index) => (
          <TinderCard
            ref={childRefs[index]}
            style={{ position: 'absolute' }}
            key={trait}
            className="swipe"
            onSwipe={(dir) => swiped(dir, trait)}
            onCardLeftScreen={() => outOfFrame(trait)}
          >
            <div
              style={{
                backgroundImage: `url(${imgUrl})`,
                position: 'relative',
                width: '500px',
                padding: '20px',
                maxWidth: '85vw',
                height: '50vh',
                borderRadius: '20px',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: '0px 0px 13px 5px #0E4749',
              }}

            >
              <h1 style={{
                color: '#e55812',
                marginTop: '-20px',
                textShadow: '1px 1px #002626',
                fontFamily: 'Lobster Two',
                letterSpacing: '2px',
                fontSize: '50px',
              }}
              >
                { trait }
              </h1>

            </div>
          </TinderCard>
        )) }
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        { !dogs.length && (
        <Button
          variant="contained"
          color="primary"
          style={{ width: '250px', height: '60px', fontSize: '20px' }}
          startIcon={<PetsIcon />}
          onClick={async () => {
            console.warn(form);
            await axios.post('/data/dog', form);
            history.push('/toybox');
          }}
        >
          Get My Results!
        </Button>
        ) }
      </div>
      <div style={{
        position: 'fixed',
        bottom: '18vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '10px',

      }}
      >
        <IconButton
          onClick={() => swipe('left')}
        >
          <CancelIcon
            fontSize="large"
            style={{ color: '#e55812', width: '60', height: '60' }}
          />
        </IconButton>
        <IconButton
          onClick={() => swipe('right')}
        >
          <CheckCircleIcon
            fontSize="large"
            style={{ color: '#2CDA9D', width: '60', height: '60' }}
          />
        </IconButton>

      </div>
      <div
        style={{
          position: 'fixed',
          bottom: '12vh',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {lastDirection ? (
          <h2 style={{ color: '#0E4749' }} key={lastDirection} className="infoText">
            {`You swiped ${lastDirection}`}
          </h2>
        ) : <h1 style={{ color: '#0E4749' }} className="infoText">Swipe a card or press a button to get started!</h1> }
      </div>
    </div>
  );
};

PersonalityAssessment.propTypes = {
  setActive: PropTypes.func.isRequired,
  setOutgoing: PropTypes.func.isRequired,
  setAggressive: PropTypes.func.isRequired,

};

export default PersonalityAssessment;
