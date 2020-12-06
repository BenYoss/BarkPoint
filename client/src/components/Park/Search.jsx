import React from 'react';
import PropTypes from 'prop-types';
import usePlacesAutoComplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import './Park.css';
import '@reach/combobox/styles.css';

const Search = ({ panTo }) => {
  // uses usePlacesAutoComplete to set the radius of
  // lat long coordinates when something is typed into the search bar
  const {
    ready, value, suggestions: { status, data }, setValue, clearSuggestions,
  } = usePlacesAutoComplete({
    requestOptions: {
      location: { lat: () => 29.951065, lng: () => -90.071533 },
      radius: 200 * 1000,
    },
  });

  return (
  // combox is used to store suggestions from function above it
  // is the set the address chosen and converted into geocode from getGeoCode

    // combox Input will change on type and once enter is pressed
    // data will be iterated through and displayed in combolist
    <div className="search">
      <Combobox
        onSelect={async (address) => {
          setValue(address, false);
          clearSuggestions();
          const results = await getGeocode({ address });
          const { lat, lng } = await getLatLng(results[0]);
          panTo({ lat, lng });
          setValue('');
        }}
      >
        <ComboboxInput value={value} onChange={(e) => setValue(e.target.value)} disabled={!ready} placeholder="Where are you going?" />
        <ComboboxPopover>
          <ComboboxList>

            { status === 'OK' && data.map(({ id, description }) => <ComboboxOption key={id} value={description} />) }
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};

Search.propTypes = {
  panTo: PropTypes.func.isRequired,
};

export default Search;
