/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  useState, useCallback, useRef, useEffect,
} from 'react';
import axios from 'axios';
import {
  GoogleMap, useLoadScript, Marker, InfoWindow,
} from '@react-google-maps/api';
import { formatRelative } from 'date-fns';

import PropTypes from 'prop-types';
import mapStyles from './ParkStyles';
import SideBar from './SideBar';

import Search from './Search';

const libraries = ['places'];

const mapContainerStyle = {
  width: '85vw',
  height: '100vh',
};
const center = {
  lat: 29.951065,
  lng: -90.071533,
};

const options = {
  styles: mapStyles,
  zoomControl: true,
};

const Park = () => {
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [venues, setVenues] = useState([]);
  const [location, setLocation] = useState('29.951065, -90.071533');

  useEffect(() => {
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
      setVenues(data.response.groups[0].items);
    };
    getVenues();
  }, [location]);

  const mapRef = useRef();
  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(12);
    setLocation(`${lat}, ${lng}`);
  });
  const onMapClick = useCallback((e) => {
    setMarkers((current) => [...current, {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
      time: new Date(),
    },
    ]);
  }, []);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_KEY,
    libraries,
  });

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) {
    return 'error loading maps';
  }
  if (!isLoaded) {
    return 'Loading maps';
  }

  return (
    <div>
      <SideBar />

      <img src="https://i.imgur.com/NOS6OVz.png" alt="logo" className="logo-container" />

      <Search panTo={panTo} setLocation={setLocation} />
      <Locate panTo={panTo} setLocation={setLocation} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
        streetViewControl
      >
        { markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
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
        { selected && (
          <InfoWindow
            position={{
              lat: selected.lat || selected.venue.location.lat,
              lng: selected.lng || selected.venue.location.lng,
            }}
            onCloseClick={() => setSelected(null)}
          >
            <div>
              { selected.venue
                ? (
                  <div>
                    <h1>{ selected.venue.name }</h1>
                    <br />
                    <p>
                      {' '}
                      { selected.venue.location.formattedAddress[0] }
                      {' '}
                    </p>
                  </div>
                )
                : (
                  <div>
                    <form action="" style={{ marginRight: '0.5rem', width: '100%' }}>
                      <label htmlFor="title">Title</label>
                      <br />
                      <input type="text" id="title" name="title" placeholder="Title" />
                      <br />
                      <label htmlFor="comments">Comments</label>
                      <br />
                      <textarea type="text" rows={3} id="text" name="text" placeholder="Comments" />
                    </form>
                    {' '}
                    {selected.time && <small>{formatRelative(selected.time, new Date())}</small> }
                    <br />
                    <button type="submit">Submit</button>
                  </div>
                )}

            </div>

          </InfoWindow>
        ) }
      </GoogleMap>
    </div>
  );
};

const Locate = ({ panTo }) => (
  <button
    className="locate"
    type="submit"
    onClick={() => {
      navigator.geolocation.getCurrentPosition(
        (position) => panTo({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }),
        () => null,
      );
    }}
  >
    <img src="https://cdn.shopify.com/s/files/1/0082/3142/0009/products/Dog_Paw_Compass_SKU-02949-L_Black_800x.png?v=1549382505" alt="compass" />
  </button>
);

Locate.propTypes = {
  panTo: PropTypes.func.isRequired,
};

export default Park;
