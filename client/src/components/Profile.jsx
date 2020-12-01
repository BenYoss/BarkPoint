import React, { useState, useEffect } from 'react';

// Import materialui info
import { makeStyles, styled } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Import components & css
import ToyBox from './ToyBox';
import Navbar from './Navbar';
import './Profile.css';

// Import axios
// const axios = require('axios');

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
    Width: '50%',
    height: 'auto',
    flexDirection: 'row',
    backgroundColor: '#FEFDFF',
    breakInside: 'avoid',
    fontFamily: 'Roboto',
  },
}));

const Profile = () => {
  const [dogs] = useState([{ name: 'Fido', image: 'https://i.pinimg.com/originals/d1/8c/ac/d18cacc593eff679f63fa49e265a7ade.jpg' },
    { name: 'Mickey', image: 'https://i.insider.com/5c005d9bac00e20fe169f725?width=1100&format=jpeg&auto=webp' }, { name: 'Marc Anthony', image: 'https://www.rover.com/blog/wp-content/uploads/2020/01/White-Dog-in-Vest-and-Sun-Goggles-960x540.jpg' }]); const [expanded, setExpanded] = React.useState(false);

  const classes = useStyles();

  const handleExpandClick = () => {
    setExpanded(!expanded);
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

  const getDogs = () => {
    // Awaiting auth.Router function that pulls all dogs
  };

  useEffect(() => {
    getDogs();
  }, []);

  return (
    <div className="Profile">
      <Navbar />
      <div className="dogs">
        {dogs.map((dog) => (
          <div className="header">
            <Card className={classes.card}>
              <CardHeader
                title={dog.name}
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
                  <Typography paragraph>Toys:</Typography>
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
        <MyButton onClick={() => { window.location.href = '/form'; }}>Add Dog</MyButton>
      </div>
      <div style={{ display: 'none' }}>
        <ToyBox dogs={dogs} />
      </div>
    </div>
  );
};

export default Profile;
