import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';

// Styling import
import './ToyBox.css';

// Button Import
import Button from '@material-ui/core/Button';
import { makeStyles, styled } from '@material-ui/core/styles';

// Card Import
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
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
    height: '20px',
    paddingTop: '60px',
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

const ToyBox = () => {
  const classes = useStyles();
  const [toys, setToys] = useState([]);
  const [hide] = useState(true);

  const getToy = () => {
    // let dogSearch;
    // let user;

    // axios.get('session')
    //   .then((response) => {
    //     user = response.data;
    //     axios.get('/data/dog', user)
    //       .then((res) => {
    //         console.log(res.data);
    //         dogSearch = res.data.slice(res.data.length - 1);
    //         console.log(dogSearch);
    //       }).catch((error) => {
    //         console.warn(error);
    //       });
    //   }).catch((error) => {
    //     console.warn(error);
    //   });

    // axios.get('/get/toys', dogSearch.personalitytypes)
    //   .then((response) => {
    //     setToys(response.data.filter((newToy) => newToy.price));
    //     setHide(false);
    //   })
    //   .catch((error) => {
    //     console.warn(error);
    //   });
  };

  const refresh = () => {
    if (toys.length > 10) {
      setToys(toys.slice(10));
    }

    if (toys.length < 10) {
      getToy();
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
        console.info(response);
      })
      .catch((error) => {
        console.warn(error);
      });
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
    getToy();
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
      <div style={{ display: hide ? 'none' : 'block' }}>
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
            >
              <option value="all">will cycle through dogs prop/array here</option>
            </select>
          </div>
        </div>
        <div
          className="dogs"
          style={{
            width: '100%', height: '100%', paddingBottom: '10px', columnCount: '3',
          }}
        >
          {toys.slice(0, 9).map((toy) => (
            <Card
              className={classes.root}
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
    </div>
  );
};

// ToyBox.propTypes = {
//   dogs: PropTypes.arrayOf(PropTypes.shape({
//     name: PropTypes.string,
//     breed: PropTypes.string,
//     image: PropTypes.string,
//     size: PropTypes.string,
//     toys: PropTypes.arrayOf,
//   })).isRequired,
// };

export default ToyBox;
