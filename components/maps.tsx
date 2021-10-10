import React, { useState } from 'react';

import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';

const Maps = () => {
  const [selected, setSelected] = useState(false);

  return (
    <>
      <GoogleMap
        defaultZoom={18}
        defaultCenter={{ lat: 45.72398, lng: 8.63095 }}>
        <Marker
          position={{ lat: 45.72398, lng: 8.63095 }}
          onClick={() => {
            setSelected(true);
          }}
        />
        {selected && (
          <InfoWindow
            position={{ lat: 45.72398, lng: 8.63095 }}
            onCloseClick={() => {
              setSelected(false);
            }}>
            <div>
              <h1 className='p-2 text-xl bg-red-700 text-white font-bold mb-2'>
                via ROMA | non solo pizza
              </h1>
              <p className='mb-4 font-thin'>
                Via Roma, 40, 21018 Sesto Calende VA, Italy
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </>
  );
};

const WrappedMap = withScriptjs(withGoogleMap(Maps));

export default WrappedMap;
