/* eslint-disable react/prop-types */
import React from 'react';
import './SideBar.css';

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
    {favParks.length && favParks.map((park) => (
      <p>{ park.venue ? park.venue.name : park.name }</p>
    ))}
  </div>
);

export default SideBar;
