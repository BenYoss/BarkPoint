import React from 'react';
import './Navbar.css';
import {
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  Container,
  Avatar,
} from '@material-ui/core';

import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({

  navDisplayFlex: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  linkText: {
    textDecoration: 'none',
    textTransform: 'uppercase',
    color: 'white',
    textAlign: 'right',
  },
  avatar: {
    height: '10vh',
    width: '10vh',
    alignSelf: 'left',
  },
});

const navLinks = [
  { title: 'Profile', path: '/profile' },
  { title: 'ToyBox', path: '/toybox' },
  { title: 'ParkMap', path: '/park' },
  { title: 'LogOut', path: '/logout' },
];

const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar style={{ background: '#0e4749' }} position="static">
      <Toolbar>
        <Avatar className={classes.avatar}>
          <img className="avatar-logo" src="https://i.ibb.co/zRR5Nd4/barkpoint.png" alt="" />
        </Avatar>
        <Container maxWidth="md">
          <List
            component="nav"
            aria-labelledby="main navigation"
            className={classes.navDisplayFlex}
          >
            {navLinks.map(({ title, path }) => (
              <Link to={path} key={title} className={classes.linkText}>
                <ListItem button>
                  <ListItemText primary={title} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Container>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
