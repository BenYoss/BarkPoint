import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

// Import materialui info
import { makeStyles, styled } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
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
    maxWidth: '345px',
    flexDirection: 'row',
    backgroundColor: '#FEFDFF',
    breakInside: 'avoid',
    fontFamily: 'Roboto',
    marginBottom: '20px',
  },
}));

const Profile = ({ dogs, getDogs }) => {
  const [expanded, setExpanded] = useState(false);

  const history = useHistory();
  const classes = useStyles();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const deleteDog = (dog) => {
    // eslint-disable-next-line no-underscore-dangle
    const dogID = dog._id;
    axios.delete('data/dog', dogID)
      .then((response) => {
        console.info(response);
        getDogs();
        // console.log(dogs);
      }).catch((err) => {
        console.warn(err);
      });
  };

  const deleteToy = (dog, toy) => {
    // console.log(dog._id, toy);

    // eslint-disable-next-line no-underscore-dangle
    axios.delete(`data/toy:${dog._id}`, { data: { data: toy } })
      .then((response) => {
        console.info(response);
        getDogs();
        // console.log(dogs);
      }).catch((err) => {
        console.warn(err);
      });
  };

  const MyButton = styled(Button)({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    width: 300,
    padding: '0 30px',
  });

  useEffect(() => {
    getDogs();
    // console.log(dogs);
  }, []);

  return (
    <div className="Profile">
      <Navbar />
      <div className="dogs">
        {dogs.map((dog) => (
          <div className="header">
            <Card
              className={classes.card}
            >
              <CardHeader
                title={dog.name}
                action={(
                  <IconButton aria-label="delete dogs">
                    <DeleteIcon onClick={() => deleteDog(dog)} />
                  </IconButton>
              )}
              />
              <CardMedia
                className={classes.media}
                image={dog.image}
              />
              <CardActions disableSpacing>
                <h3>{`${dog.name}'s Toys`}</h3>
                <IconButton
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
                    <div>
                      <p>{toys.name}</p>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon onClick={() => {
                          deleteToy(dog, toys);
                        }}
                        />
                      </IconButton>
                    </div>
                  ))}
                </CardContent>
              </Collapse>
            </Card>
          </div>
        ))}
      </div>
      <div
        style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',
        }}
      >
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
