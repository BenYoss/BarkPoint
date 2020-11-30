import React, { useState, useCallback, useRef } from 'react';
import {
  GoogleMap, useLoadScript, Marker, InfoWindow,
} from '@react-google-maps/api';
import { formatRelative } from 'date-fns';
import usePlacesAutoComplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import '@reach/combobox/styles.css';
import './Park.css';
import mapStyles from './ParkStyles';

console.warn(process.env.GOOGLE_MAPS_KEY);
const libraries = ['places'];
const mapContainerStyle = {
  width: '99vw',
  height: '98vh',
};
const center = {
  lat: 29.951065,
  lng: -90.071533,
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const Park = () => {
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
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

  const mapRef = useRef();
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

      <img src="https://i.imgur.com/NOS6OVz.png" alt="logo" className="logo-container" />

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
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
        { selected && (
          <InfoWindow position={{ lat: selected.lat, lng: selected.lng }}>
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
              <small>{ formatRelative(selected.time, new Date()) }</small>
              <br />
              <button type="submit">Submit</button>

            </div>

          </InfoWindow>
        ) }
      </GoogleMap>
    </div>
  );
};

export default Park;
