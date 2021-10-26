import React, { useState, memo } from "react";
import {
  GoogleMap,
  LoadScript,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const Maps = () => {
  const [selected, setSelected] = useState(false);

  return (
    <>
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      >
        <GoogleMap
          zoom={18}
          center={{ lat: 45.72398, lng: 8.63095 }}
          mapContainerStyle={containerStyle}
        >
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
              }}
            >
              <div>
                <h1 className="p-2 text-xl bg-red-700 text-white font-bold mb-2">
                  via ROMA | non solo pizza
                </h1>
                <p className="mb-4 font-thin">
                  Via Roma, 40, 21018 Sesto Calende VA, Italy
                </p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </>
  );
};

const WrappedMap = memo(Maps);

export default WrappedMap;
