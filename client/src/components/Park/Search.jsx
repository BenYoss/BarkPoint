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
  const {
    ready, value, suggestions: { status, data }, setValue, clearSuggestions,
  } = usePlacesAutoComplete({
    requestOptions: {
      location: { lat: () => 29.951065, lng: () => -90.071533 },
      radius: 200 * 1000,
    },
  });

  return (
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
