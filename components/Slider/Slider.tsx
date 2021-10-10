import React, { createRef, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import useFirestore from '../../lib/hooks/useFirestore';


const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

function ImageSlider() {
  const { docs } = useFirestore('sliderimages');
  console.log(docs)
  return (
    <section className='relative flex items-center content-center justify-center h-screen pt-16 pb-32'>
      <div className='absolute top-0 w-full h-full bg-center bg-cover'>
        {/* <Image
          src={}
          alt='home background image'
          layout='fill'
          objectFit='cover'
          quality={75}
          placeholder='blur'
         
          loading='lazy'
        /> */}
        <span
          id='blackOverlay'
          className='absolute w-full h-full bg-black opacity-75'></span>
      </div>
    </section>
  );
}

export default ImageSlider;
