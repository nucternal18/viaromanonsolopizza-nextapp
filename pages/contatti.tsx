import React from "react";
import WrappedMap from "../components/maps";

function Contatti() {
  return (
    <section className="w-full mt-8 flex-grow">
      <div className="container mx-auto flex flex-col md:flex-row w-11/12 md:w-full  flex-wrap text-left  mb-4 overflow-hidden shadow-lg">
        <div className="w-full md:w-2/5 p-8 bg-red-800 text-white">
          <h1 className="text-2xl mb-4">Indirizzo</h1>
          <p className="mb-4 font-thin">
            Via Roma, 40, 21018 Sesto Calende VA, Italy
          </p>
          <h1 className="text-2xl mb-4">Chiamaci</h1>
          <p className="mb-4 font-thin">+39 0331 913574</p>
        </div>
        <div className="w-full md:w-3/5">
          <WrappedMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `500px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      </div>
    </section>
  );
}

export default Contatti;
