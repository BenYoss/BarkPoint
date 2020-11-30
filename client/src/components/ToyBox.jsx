import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';

import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import Navbar from './Navbar';


const axios = require('axios');

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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
  avatar: {
    backgroundColor: red[500],
  },
}));

const ToyBox = ({ dogs }) => {
  const classes = useStyles();
  const [toys, setToys] = useState([]);

  useEffect(() => {
    getToy();
    console.log(toys);
    console.log(dogs);
  }, []);

  const getToy = () => axios.get('/get/toys')
    .then((response) => {
      const array = response.data.filter((newToy) => {
        if (newToy.price.value) {
          return newToy;
        }
      });
      console.log(array);
      setToys(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

  const refresh = () => {
    if (toys.length > 10) {
      setToys(toys.slice(10));
      console.log(toys);
    }

    if (toys.length < 10) {
      getToy();
      console.log(toys);
    }
  };

  const saveToy = (toyName, toyCost, toyRating, toyLink, toyImage) => {
    const dogToy = {
      id: 123,
      body: {
        name: toyName,
        price: toyCost,
        image: toyImage,
        url: toyLink,
        rating: toyRating,
      },
    };

    axios.put('/data/dog', dogToy)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const MyButton = styled(Button)({
  //   background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  //   border: 0,
  //   borderRadius: 3,
  //   boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  //   color: 'white',
  //   height: 48,
  //   width: 300,
  //   padding: '0 30px',
  // });

  return (
    <div>
      <div>
        <button onClick={() => refresh()}>Refresh</button>
      </div>
      <div className="select">
        <select name="select" className="filter">
          <option value="all">test</option>
        </select>
      </div>
      <div className="dogs" style={{ width: '100%', height: '100%', paddingBottom: '10px' }}>
        {toys.slice(0, 10).map((toy) => (
          <Card
            className={classes.root}
            style={{
              Width: '50%', height: 'auto', flexDirection: 'row', backgroundColor: '#FEFDFF', breakInside: 'avoid', fontFamily: 'Roboto',
            }}
          >
            <CardMedia
              className={classes.media}
              image={toy.image}
              onClick={() => { window.open(`${toy.link}`); }}
            />
            <CardContent>
              <small>
                {toy.title}
              </small>
              <p>
                $
                {toy.price.value}
              </p>
            </CardContent>
            <CardActions disableSpacing>
              <div>
                <IconButton aria-label="add to favorites" onClick={() => saveToy(toy.title, toy.link, toy.price.value, toy.image, toy.rating)}>
                  <FavoriteIcon />
                </IconButton>
              </div>
              <p>
                {toy.rating}
                {' '}
                Rating
              </p>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

ToyBox.propTypes = {
  dogs: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    breed: PropTypes.string,
    image: PropTypes.string,
    size: PropTypes.string,
    toys: PropTypes.arrayOf,
  })).isRequired,
};

export default ToyBox;
