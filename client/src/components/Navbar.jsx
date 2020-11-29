import * as React from 'react';
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

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  navbarDisplayFlex: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  navDisplayFlex: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  linkText: {
    textDecoration: 'none',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Nerko One',
  },
  avatar: {
    height: '15vh',
    width: '15vh',
  },
});

const navLinks = [
  { title: 'Profile', path: '/profile' },
  { title: 'ToyBox', path: '/toybox' },
  { title: 'Park', path: '/park' },
];

const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar style={{ background: '#0e4749' }} position="static">
      <Toolbar>
        <Container maxWidth="md" className={classes.navbarDisplayFlex}>
          <Avatar edge="start" className={classes.avatar}>
            <img className="avatar-logo" src="https://i.ibb.co/zRR5Nd4/barkpoint.png" alt="" />
          </Avatar>
          <List
            component="nav"
            aria-labelledby="main navigation"
            className={classes.navDisplayFlex}
          >
            {navLinks.map(({ title, path }) => (
              <a href={path} key={title} className={classes.linkText}>
                <ListItem button>
                  <ListItemText primary={title} />
                </ListItem>
              </a>
            ))}
          </List>
        </Container>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
