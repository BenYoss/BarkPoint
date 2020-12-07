/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  useState, useCallback, useRef, useEffect,
} from 'react';
import axios from 'axios';
// imports from GoogleMapsAPI package
import {
  GoogleMap, useLoadScript, Marker, InfoWindow,
} from '@react-google-maps/api';

// imports from Material Ui for styling
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import mapStyles from './ParkStyles';
import SideBar from './SideBar';

// component imports
import Search from './Search';
import Locate from './Locate';
import './Park.css';

// allows for the use of googleplaces in the googlemaps
const libraries = ['places'];

// sets the dimensions of the map
const mapContainerStyle = {
  width: '85vw',
  height: '100vh',
};

// on initial render will set where the map pans to
const center = {
  lat: 29.951065,
  lng: -90.071533,
};

// options for the google map
const options = {
  styles: mapStyles,
  zoomControl: true,
};

const Park = () => {
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [venues, setVenues] = useState([]);
  const [location, setLocation] = useState('29.951065, -90.071533');
  const [form, setForm] = useState({
    name: '', lat: 1, long: 1, comments: '',
  });
  const [isClicked, setIsClicked] = useState({});

  const [parkData, setParkData] = useState([]);
  const [favParks, setFavParks] = useState([]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const getVenues = async () => {
    const { data } = await axios.get('https://api.foursquare.com/v2/venues/explore', {
      params: {
        client_id: process.env.FOUR_SQUARE_CLIENT_ID,
        client_secret: process.env.FOUR_SQUARE_CLIENT_SECRET,
        query: 'dog park',
        ll: location,
        v: '20180323',
        limit: 100,
        radius: 100000,
      },
    });

    const { data: parks } = await axios.get('/data/park');
    const { data: userid } = await axios.get('session');
    const { id_google } = userid;
    const { data: faveparks } = await axios.get('/data/favpark', { params: { id: id_google } });
    setVenues(data.response.groups[0].items);
    setParkData(parks);
    setFavParks(faveparks);
  };
  useEffect(() => {
    getVenues();
  }, [location]);

  // lifecylce useRef will reference the map made above

  const mapRef = useRef();

  // function panTo will use lifecycle useCallback to go to a specified location on the map
  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(12);
    setLocation(`${lat}, ${lng}`);
  });

  // whenver the map is clicked markers will be set and the lat
  // and long will be set in the form for those points
  const onMapClick = useCallback((e) => {
    setMarkers((current) => [...current, {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
      time: new Date(),
    },
    ]);

    setForm({ ...form, lat: e.latLng.lat(), long: e.latLng.lng() });
  }, []);

  // checks if the map is loaded using the useLoadScript function from googlemapsapi npm package

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_KEY,
    libraries,
  });

  // when the map loads...
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) {
    return 'error loading maps';
  }
  if (!isLoaded) {
    return 'Loading maps';
  }

  // handles when a park is liked and will reset by getting the venues
  const handleLike = async (park) => {
    const { data } = await axios.get('session');
    const { id_google } = data;
    await axios.put(`/data/favpark/${id_google}`, park);
    getVenues();
    setSelected(null);
  };

  // the same as like except for it deletes a park
  const handleDelete = async (park) => {
    const { data } = await axios.get('session');
    const { id_google } = data;
    await axios.put(`/data/unfavpark/${id_google}`, park);
    getVenues();
    setSelected(null);
  };

  return (
    <div>
      <SideBar
        favParks={favParks}
      />
      <div className="container">
        <img src="https://i.imgur.com/NOS6OVz.png" alt="logo" className="logo-container" />
      </div>

      <Search panTo={panTo} setLocation={setLocation} />
      <Locate panTo={panTo} setLocation={setLocation} />

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
        streetViewControl // enables streetview control within park
      >
        { markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            // custom icon for the markers being set
            icon={{
              url: 'https://i.imgur.com/T1JV3Qy.png',
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        )) }
        { venues.map((marker) => (
          <Marker
            key={marker.venue.id}
            position={{ lat: marker.venue.location.lat, lng: marker.venue.location.lng }}
            icon={{
              url: 'https://i.imgur.com/T1JV3Qy.png',
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}
        { parkData.map((marker) => (
          <Marker
            // eslint-disable-next-line no-underscore-dangle
            key={marker._id}
            position={{ lat: Number(marker.lat), lng: Number(marker.long) }}
            icon={{
              url: 'https://i.imgur.com/T1JV3Qy.png',
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        )) }
        { selected && (
          <InfoWindow
          // sets the position of the info window over the point of the marker
          // eslint-disable-next-line no-nested-ternary
            position={selected.venue ? {
              lat: selected.venue.location.lat,
              lng: selected.venue.location.lng,
            } : selected.long
              ? { lat: selected.lat, lng: selected.long }
              : { lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              { selected.venue || selected.name
                ? (
                  <div className="popup">
                    <h1 className="popup-text">
                      { selected.venue ? selected.venue.name : selected.name }
                    </h1>
                    <hr />
                    <p className="popup-comment">
                      { selected.venue ? selected.venue.location.formattedAddress[0]
                        : selected.comments }
                    </p>
                    <IconButton
                      onClick={() => {
                        // sets state for favoriting or unfavorting parks
                        setIsClicked({
                          ...isClicked,
                          [selected.venue ? selected.venue.id : selected._id]:
                            // eslint-disable-next-line no-unneeded-ternary
                            isClicked[selected.venue
                              ? selected.venue.id : selected._id] ? false : true,
                        });
                        if (!isClicked[selected.venue ? selected.venue.id : selected._id]) {
                          handleLike(selected);
                        } else { handleDelete(selected); }
                      }}
                    >
                      {!isClicked[selected.venue ? selected.venue.id : selected._id]
                        ? (
                          <FavoriteBorderIcon
                            fontSize="small"
                            style={{ color: '#e55812' }}
                          />
                        )
                        : (
                          <FavoriteIcon
                            fontSize="small"
                            style={{ color: '#e55812' }}
                          />
                        ) }
                    </IconButton>
                  </div>
                )
                : (
                  // for the form when a new park is created
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
                      <br />
                      <TextField
                        label="Comments"
                        multiline
                        rows={4}
                        variant="outlined"
                        style={{ marginTop: '5px' }}
                        onChange={handleChange}
                        name="comments"
                      />
                      <br />
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: '#e55812', color: '#002626', fontWeight: 'bold', marginTop: '5px', marginBottom: '5px',
                        }}
                        onClick={async () => {
                          await axios.post('/data/park', form);
                          await getVenues();
                          setSelected(null);
                        }}
                      >
                        Submit
                      </Button>
                    </form>
                  </div>
                )}

            </div>

          </InfoWindow>
        ) }
      </GoogleMap>
    </div>
  );
};

export default Park;
