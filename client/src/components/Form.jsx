/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
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
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import request from 'superagent';

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

export default function Form({ setName, form, setForm }) {
  const history = useHistory();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const classes = useStyles();
  const [uploadedFile, setUploadedFile] = useState(null);

  const preset = process.env.CLOUDINARY_UPLOAD_PRESET;
  const URL = process.env.CLOUDINARY_UPLOAD_URL;

  const handleImageUpload = (file) => {
    const upload = request.post(URL)
      .field('upload_preset', preset)
      .field('file', file);

    // eslint-disable-next-line consistent-return
    upload.end((err, response) => {
      if (err) {
        return err;
      }

      if (response.body.secure_url !== '') {
        setForm({ ...form, image: response.body.secure_url });
      }
    });
  };

  const onImageDrop = (files) => {
    setUploadedFile(files[0]);
    handleImageUpload(files[0]);
  };

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
          onSubmit={(e) => {
            e.preventDefault();
            console.warn(form);
            setName(form.dogname);
            history.push('/assessment');
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

          <Dropzone
            onDrop={onImageDrop}
            accept="image/*"
            multiple={false}
          >
            { ({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
              >
                <div>
                  <input {...getInputProps()} />
                  <p style={{ cursor: 'pointer' }}>Drop an image or click to select a file to upload</p>
                </div>
                <div>
                  {form.image === '' ? null : (
                    <div>
                      <p>{uploadedFile.name}</p>
                      <img style={{ height: '15vh', width: '10vw' }} src={form.image} alt="dogImage" />
                    </div>
                  )}
                </div>
              </div>
            )}

          </Dropzone>

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
