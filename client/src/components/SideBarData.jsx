import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PetsIcon from '@material-ui/icons/Pets';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

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
  {
    title: 'Notifications',
    icon: <NotificationsActiveIcon />,
    link: '/home',
    id: 4,
  },
];

export default SideBarData;
