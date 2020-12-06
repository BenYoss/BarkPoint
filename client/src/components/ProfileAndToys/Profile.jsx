/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

// Import materialui info
import { makeStyles, styled } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ClearIcon from '@material-ui/icons/Clear';
// import { borders } from '@material-ui/system';

// Import components & css
// import ToyBox from './ToyBox';
import Navbar from './Navbar';
// import Toast from './Snackbar';
import './Profile.css';

// Import axios
const axios = require('axios');

const useStyles = makeStyles((theme) => ({
  media: {
    paddingTop: '81.25%',
    borderRadius: '50%',
    margin: '28px',

  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  card: {
    height: 'auto',
    maxWidth: '30vw',
    flexDirection: 'row',
    backgroundColor: '#FEFDFF',
    breakInside: 'avoid',
    marginBottom: '20px',
  },
}));

const Profile = ({ dogs, getDogs }) => {
  const [expanded, setExpanded] = useState(false);

  const history = useHistory();
  const classes = useStyles();

  const deleteDog = (dog) => {
    // eslint-disable-next-line no-underscore-dangle
    const dogID = dog._id;
    axios.delete(`data/dog${dogID}`)
      .then((response) => {
        console.info(response);
        getDogs();
      }).catch((err) => {
        console.warn(err);
      });
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const deleteToy = (dog, toy) => {
    // eslint-disable-next-line no-underscore-dangle
    axios.delete(`data/toy${dog._id}`, { data: { data: toy } })
      .then(() => {
        getDogs();
      }).catch((err) => {
        console.warn(err);
      });
  };

  const MyButton = styled(Button)({
    background: '#0e4749',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: '5vh',
    width: '10vw',
    padding: '0 30px',
  });

  useEffect(() => {
    getDogs();
    // console.log(dogs);
  }, []);

  return (
    <div className="Profile">
      <Navbar />
      <div
        className="dogProfile"
      >
        {dogs.map((dog) => (
          <Card
            className={classes.card}
            style={{ border: '10px solid #0e4749' }}
          >
            <CardHeader
              title={dog.name}
              style={{ color: '#e55812', fontFamily: 'Fredoka One' }}
              action={(
                <IconButton aria-label="delete dogs">
                  <DeleteIcon style={{ color: '#2CDA9D' }} onClick={() => deleteDog(dog)} />
                </IconButton>
              )}
            />
            <CardMedia
              className={classes.media}
              image={dog.image}
            />
            <CardActions disableSpacing>
              <h3 style={{ color: '#2CDA9D', fontFamily: 'Lato', letterSpacing: '2' }}>{`${dog.name}'s Toys`}</h3>
              <IconButton
                id={dog._id}
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                {dog.toys && dog.toys.map((toys) => (
                  <div className="">
                    <IconButton
                      onClick={() => {
                        deleteToy(dog, toys);
                      }}
                    >
                      <ClearIcon
                        style={{ color: '#e55812' }}
                      />
                    </IconButton>
                    <img className="toy-image" src={toys.image} alt="toy" />
                  </div>
                ))}
              </CardContent>
            </Collapse>
          </Card>
        ))}

      </div>
      <div style={{ margin: 'auto', width: '50%', marginTop: '2rem' }}>
        <MyButton onClick={() => { history.push('/form'); }}>Add Dog</MyButton>
      </div>
    </div>
  );
};

Profile.propTypes = {
  dogs: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    breed: PropTypes.string,
    image: PropTypes.string,
    size: PropTypes.string,
    toys: PropTypes.arrayOf,
  })).isRequired,
  getDogs: PropTypes.func.isRequired,
};

export default Profile;
