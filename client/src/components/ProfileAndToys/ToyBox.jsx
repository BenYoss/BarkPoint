/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';

// Styling import
import './ToyBox.css';
import PropTypes from 'prop-types';

// Button Import
import Button from '@material-ui/core/Button';
import { makeStyles, styled, withStyles } from '@material-ui/core/styles';

// Card Import
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PetsIcon from '@material-ui/icons/Pets';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import Navbar from './Navbar';

const axios = require('axios');

const useStyles = makeStyles((theme) => ({
  root: {
    width: '50%',
    height: 'auto',
    flexDirection: 'row',
    backgroundColor: '#FEFDFF',
    breakInside: 'avoid',
    fontFamily: 'Roboto',
    maxWidth: 345,
    marginBottom: '20px',
  },
  media: {
    height: '40vh',
    width: '20vw',
    maxHeight: '40vh',
    cursor: 'pointer',
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

const StyledRating = withStyles({
  iconFilled: {
    color: '#0E4749',
  },
})(Rating);

const ToyBox = ({ dogs, getDogs }) => {
  const classes = useStyles();
  const [toys, setToys] = useState([]);
  const [hide, setHide] = useState(true);
  const [theCurrentDog, settheCurrentDog] = useState(dogs[0]);
  const [isClicked, setIsClicked] = useState({});

  const getToy = async () => {
    const { data } = await axios.get('session');
    await axios.get('/data/dog', { params: data });
    const obj = {
      type1: theCurrentDog.personalitytypes[0],
      type2: theCurrentDog.personalitytypes[1],
      type3: theCurrentDog.personalitytypes[2],
    };
    const { data: toyData } = await axios.get('/get/toys', { params: obj });
    setToys(toyData.filter((newToy) => newToy.price));
    setHide(false);
  };

  const refresh = () => {
    if (toys.length > 6) {
      setToys(toys.slice(6));
    }

    if (toys.length < 6) {
      getToy();
    }
  };

  const saveToy = async (image, title, link, rating, price) => {
    const toy = {
      image,
      title,
      link,
      rating,
      price,
    };

    const { data: dogData } = axios.get('session');
    const { data: dogIdData } = await axios.get('/data/dog', { params: dogData });
    const id = dogIdData.find((dog) => theCurrentDog._id === dog._id);
    await axios.put(`/data/dog/${id._id}`, toy);
  };

  const getDogToy = async (searchDog) => {
    const ourDog = dogs.find((dogFind) => dogFind.name === searchDog);

    const obj = {
      type1: ourDog.personalitytypes[0],
      type2: ourDog.personalitytypes[1],
      type3: ourDog.personalitytypes[2],
    };

    setHide(true);

    const { data: toyData } = await axios.get('/get/toys', { params: obj });

    setToys(toyData.filter((newToy) => newToy.price));
    setHide(false);

    settheCurrentDog(ourDog);
  };

  const MyButton = styled(Button)({
    background: 'linear-gradient(45deg, #2CDA9D 30%, #0E4749 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    width: 200,
    padding: '0 30px',
  });

  useEffect(() => {
    const doBoth = async () => {
      await getDogs();
      await getToy();
    };
    doBoth();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img
          src="https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fcdn.dribbble.com%2Fusers%2F238583%2Fscreenshots%2F3630870%2Flagif-grande.gif"
          alt="loading"
          style={{
            display: hide ? 'block' : 'none',
          }}
        />
      </div>
      <div className="background" style={{ display: hide ? 'none' : 'block' }}>
        <Navbar />
        <div style={{
          display: 'flex', alignItems: 'center', margin: '0 auto', width: '20%',
        }}
        >
          <div
            style={{
              display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px 0 10px 0', marginLeft: 'auto',
            }}
          >
            <MyButton onClick={() => { refresh(); }}>Refresh Toys</MyButton>
          </div>
          <div
            className="select"
            style={{
              flex: 1, marginRight: 'auto', height: '48', width: '200',
            }}
          >

            <select
              name="select"
              className="filter"
              style={{
                height: '48', width: '200',
              }}
              onChange={(event) => { getDogToy(event.target.value); }}
            >
              {dogs && dogs.map((dog) => (
                <option value={dog.name}>{dog.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div
          className="dogs"
        >
          { toys.slice(0, 6).map((toy) => (
            <Card
              className={classes.root}
              style={{ border: '5px solid #002626' }}
            >
              <CardMedia
                className={classes.media}
                image={toy.image}
                onClick={() => { window.open(`${toy.link}`); }}
              />
              <CardContent>
                <small style={{ fontFamily: 'Lato' }}>
                  {toy.title}
                </small>
                <p style={{ color: '#2CDA9D', fontFamily: 'Lato', fontSize: '18px' }}>
                  $
                  {toy.price.value}
                </p>
              </CardContent>
              <CardActions disableSpacing>

                <IconButton
                  aria-label="add to favorites"
                  onClick={() => {
                    setIsClicked({ ...isClicked, [toy.asin]: !isClicked[toy.asin] });
                    saveToy(toy.image, toy.title, toy.link, toy.rating, toy.price.value);
                  }}
                >
                  { !isClicked[toy.asin]
                    ? (
                      <FavoriteBorderIcon
                        fontSize="small"
                        style={{ color: '#e55812' }}
                      />
                    )
                    : (
                      <FavoriteIcon
                        fontSize="small"
                        style={{ color: '#e55812' }}
                      />
                    )}
                </IconButton>

                <Box fontWeight={800} component="fieldset" mb={3} borderColor="transparent">
                  <Typography variant="h5">Rating</Typography>
                  <StyledRating
                    name="customized-color"
                    value={toy.rating}
                    getLabelText={(value) => `${value} paws${value !== 1 ? 's' : ''}`}
                    precision={0.1}
                    readOnly
                    icon={<PetsIcon fontSize="inherit" />}
                  />
                </Box>

              </CardActions>
            </Card>
          ))}
        </div>
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
  getDogs: PropTypes.func.isRequired,
};

export default ToyBox;
