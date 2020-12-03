import React, { useState } from 'react';
import './SideBar.css';

import { List, ListItem, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import sideBarData from './SideBarData';

const SideBar = () => {
  const [form, setForm] = useState({
    name: '', lat: 1, long: 1, comments: '',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  return (
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

      <h2 className="form-title">Create a new park!</h2>
      <div className="form">
        <form>
          <TextField
            label="Park Name"
            variant="outlined"
            size="small"
            style={{ marginTop: '10px' }}
            onChange={handleChange}
            name="name"
          />
          <TextField
            label="latitude"
            variant="outlined"
            size="small"
            style={{ marginTop: '5px' }}
            name="lat"
            onChange={handleChange}
          />
          <TextField
            label="longitude"
            variant="outlined"
            size="small"
            style={{ marginTop: '5px' }}
            name="long"
            onChange={handleChange}
          />
          <TextField
            label="Comments"
            multiline
            rows={4}
            variant="outlined"
            style={{ marginTop: '5px' }}
            onChange={handleChange}
            name="comments"
          />
          <Button
            variant="contained"
            style={{
              backgroundColor: '#e55812', color: '#002626', fontWeight: 'bold', marginTop: '5px', marginBottom: '5px',
            }}
            onClick={async () => {
              await axios.post('/data/park', form);
            }}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SideBar;
