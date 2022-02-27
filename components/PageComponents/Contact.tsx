import React from "react";
import WrappedMap from "../maps";

function Contact() {
  return (
    <section className="w-full flex-grow bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 p-4">
      <div className="container mx-auto flex flex-col md:flex-row w-11/12 md:w-full max-w-screen-lg  flex-wrap text-left  overflow-hidden shadow-2xl">
        <div className="w-full md:w-2/5 p-8 bg-red-800 text-white">
          <h1 className="text-2xl mb-4">Indirizzo</h1>
          <p className="mb-4 font-thin">
            Via Roma, 40, 21018 Sesto Calende VA, Italy
          </p>
          <h1 className="text-2xl mb-4">Chiamaci</h1>
          <p className="mb-4 font-thin">+39 0331 913574</p>
        </div>
        <div className="w-full md:w-3/5">
          <WrappedMap />
        </div>
      </div>
    </section>
  );
}

export default Contact;
