import React from 'react';
import './SideBar.css';

import { List, ListItem, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';

import sideBarData from './SideBarData';

const SideBar = () => (
  <div className="Sidebar">

    <List
      component="nav"
      aria-labelledby="side navigation"
      className="sideBarList"
    >
      {sideBarData.map(({
        title, icon, link, id,
      }) => (
        <Link className="sideBarRow" to={link} key={id}>
          <ListItem button>
            {icon}
            <ListItemText primary={title} />
          </ListItem>
        </Link>
      ))}
    </List>
  </div>
);

export default SideBar;
