import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PetsIcon from '@material-ui/icons/Pets';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';

const SideBarData = [
  {
    title: 'Profile',
    icon: <AccountCircleIcon />,
    link: '/profile',
    id: 1,
  },
  {
    title: 'Toybox',
    icon: <SportsSoccerIcon />,
    link: '/toybox',
    id: 2,
  },
  {
    title: 'Add a new Dog',
    icon: <PetsIcon />,
    link: '/form',
    id: 3,
  },
];

export default SideBarData;
