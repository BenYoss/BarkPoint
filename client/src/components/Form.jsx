import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import './Form.css';
import axios from 'axios';
import PropTypes from 'prop-types';

require('regenerator-runtime');

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    height: '20vh',
    width: '20vh',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Form({ setName }) {
  const [form, setForm] = useState({
    size: 'medium', breed: '', number: '', dogname: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <img className="avatar-logo" src="https://i.ibb.co/zRR5Nd4/barkpoint.png" alt="" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Tell us about your pup🐾
        </Typography>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            console.warn(form);
            setName(form.dogname);
            await axios.post('/data/dog', form);
            window.location.href = '/assessment';
          }}
          className={classes.form}
          noValidate
        >
          {/* What are these textfields for? */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Pup's name"
            name="dogname"
            autoComplete="name"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="number"
            label="Phone number"
            type="phone"
            id="phone"
            autoComplete="phone"
            onChange={handleChange}

          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="breed"
            label="Breed"
            name="breed"
            autoComplete="breed"
            autoFocus
            onChange={handleChange}
          />
          {/* What does this block of code used for? Maybe add some class names? */}
          <FormControl component="fieldset">
            <FormLabel component="legend">Size</FormLabel>
            <RadioGroup aria-label="size" name="size" value={form.size} onChange={handleChange}>
              <FormControlLabel value="small" control={<Radio color="primary" />} label="small" />
              <FormControlLabel value="medium" control={<Radio color="primary" />} label="medium" />
              <FormControlLabel value="large" control={<Radio color="primary" />} label="large" />
            </RadioGroup>
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ backgroundColor: '#e55812', color: '#002626', fontWeight: 'bold' }}
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
}

Form.propTypes = {
  setName: PropTypes.func.isRequired,

};
