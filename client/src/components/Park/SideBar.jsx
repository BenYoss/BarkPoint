/* eslint-disable react/prop-types */
import React from 'react';
import './SideBar.css';
import ExploreIcon from '@material-ui/icons/Explore';

import { List, ListItem, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';

import sideBarData from './SideBarData';

const SideBar = ({ favParks }) => (
  <div className="Sidebar">
    <List
      component="nav"
      aria-labelledby="side navigation"
      className="sideBarList"
    >
      { sideBarData.map(({
        title, icon, link, id,
      }) => (
        <Link to={link} key={id}>
          <ListItem className="sideBarRow" button>
            <div className="icon">{ icon }</div>
            <ListItemText primary={title} />
          </ListItem>
        </Link>
      )) }
    </List>

    <h2 className="form-title">My Favorite Parks</h2>
    <hr />

    <div className="fave-parks">
      {favParks.length && favParks.map((park) => (
        <div className="flex park-text">
          <ExploreIcon
            fontSize="small"
            style={{ color: '#e55812', marginRight: '2px' }}
          />
          {park.venue ? park.venue.name : park.name }
        </div>
      )) }

    </div>
  </div>
);

export default SideBar;
