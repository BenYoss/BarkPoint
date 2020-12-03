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
  const [dogs, setDogs] = useState([]);
  const [toys, setToys] = useState([]);
  const [hide, setHide] = useState(true);

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

  const getToy = () => {
    axios.get('session')
      .then((response) => {
        axios.get('/data/dog', { params: response.data })
          .then(({ data }) => {
            const currentDog = data.slice(data.length - 1);
            const obj = {
              type1: currentDog[0].personalitytypes[0],
              type2: currentDog[0].personalitytypes[1],
              type3: currentDog[0].personalitytypes[2],
            };
            axios.get('/get/toys', { params: obj })
              .then(({ data: toyData }) => {
                setToys(toyData.filter((newToy) => newToy.price));
                setHide(false);
              })
              .catch((error) => {
                console.warn(error);
              });
          }).catch((error) => {
            console.warn(error);
          });
      }).catch((error) => {
        console.warn(error);
      });
  };

  const refresh = () => {
    if (toys.length > 10) {
      setToys(toys.slice(10));
    }

    if (toys.length < 10) {
      getToy();
    }
  };

  const saveToy = (image, title, link, rating, price) => {
    const toy = {
      image,
      title,
      link,
      rating,
      price,
    };

    axios.get('session')
      .then((response) => {
        axios.get('/data/dog', { params: response.data })
          .then(({ data }) => {
            // eslint-disable-next-line no-underscore-dangle
            const id = data.slice(data.length - 1)[0]._id;
            axios.put(`/data/dog/${id}`, toy)
              .then((resp) => {
                console.info(resp);
              }).catch((error) => {
                console.warn(error);
              });
          }).catch((error) => {
            console.warn(error);
          });
      }).catch((error) => {
        console.warn(error);
      });
  };

  const getDogToy = (searchDog) => {
    const ourDog = dogs.find((dogFind) => dogFind.name === searchDog);

    const obj = {
      type1: ourDog.personalitytypes[0],
      type2: ourDog.personalitytypes[1],
      type3: ourDog.personalitytypes[2],
    };

    setHide(true);

    axios.get('/get/toys', { params: obj })
      .then(({ data: toyData }) => {
        setToys(toyData.filter((newToy) => newToy.price));
        setHide(false);
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
    getDogs();
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
          style={{
            width: '100%', height: '100%', paddingBottom: '10px', columnCount: '3',
          }}
        >
          {toys.slice(0, 3).map((toy) => (
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
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon onClick={() => {
                      saveToy(toy.image, toy.title, toy.link, toy.rating, toy.price.value);
                    }}
                    />
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
