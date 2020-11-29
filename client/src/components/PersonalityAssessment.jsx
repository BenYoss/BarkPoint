import React, { useState, useMemo } from 'react';
import TinderCard from 'react-tinder-card';
import './PersonalityAssessment.css';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import PetsIcon from '@material-ui/icons/Pets';

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

const PersonalityAssessment = () => {
  const [dogs, setDogs] = useState(data);
  const [lastDirection, setLastDirection] = useState();
  const [active, setActive] = useState(false);
  const [aggressive, setAggressive] = useState(false);
  const [outgoing, setOutgoing] = useState(false);

  const childRefs = useMemo(() => Array(data.length).fill(0).map((i) => React.createRef()), []);

  const swiped = (direction, trait) => {
    if (trait === 'Active' && direction === 'right') {
      setActive(true);
    } else if (trait === 'Outgoing' && direction === 'right') {
      setOutgoing(true);
    } else if (trait === 'Aggressive' && direction === 'right') {
      setAggressive(true);
    }
    setLastDirection(direction);
    alreadySwiped.push(trait);
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
      }}
      >
        My Dog is...
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
                width: '300px',
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
          size="large"
          startIcon={<PetsIcon />}
          onClick={() => { window.location.href = '/toybox'; }}
        >
          Get My Results!
        </Button>
        ) }
      </div>
      <div style={{
        position: 'fixed',
        bottom: '8vh',
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
            style={{ color: '#e55812' }}
          />
        </IconButton>
        <IconButton
          onClick={() => swipe('right')}
        >
          <CheckCircleIcon
            fontSize="large"
            style={{ color: '#2CDA9D' }}
          />
        </IconButton>

      </div>
      <div
        style={{
          position: 'fixed',
          bottom: '1vh',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {lastDirection ? (
          <h2 style={{ color: '#0E4749' }} key={lastDirection} className="infoText">
            {`You swiped ${lastDirection}`}
          </h2>
        ) : <h2 style={{ color: '#0E4749' }} className="infoText">Swipe a card or press a button to get started!</h2> }
      </div>
    </div>
  );
};

export default PersonalityAssessment;
