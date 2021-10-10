import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <>
      <footer className=' w-full bg-gray-900 py-6 text-white bottom-0 left-0 mb-0'>
        <div className='container mx-auto px-4 md:px-6 py-6 flex flex-col md:flex-row justify-between'>
          <div className='w-full md:w-1/3 mb-4'>
            <h2 className='text-xl sm:text-2xl mb-4'>
              via ROMA non solo pizza
            </h2>
            <p className='mb-4 text-gray-500 text-sm font-hairline'>
              ViaRomaNonSoloPizza nasce dalla passione per la pizza coltivata da
              un sogno alla realizzazione
            </p>
          </div>
          <div className='w-ful px-2 sm:px-0 md:w-1/4 mb-4'>
            <h1 className='text-2xl mb-4'>Orari di apertura</h1>
            <ul className='font-thin text-gray-500'>
              <li className='flex flex-row mb-4 justify-between'>
                Lunedi: <strong className='ml-6'>Chiuso</strong>
              </li>
              <li className='flex flex-row mb-4 justify-between'>
                Martedi:
                <p className='flex flex-col'>
                  <strong>10.30am - 14.30pm</strong>
                  <strong>18.00 - 23.30pm</strong>
                </p>
              </li>
              <li className='flex flex-row mb-4 justify-between'>
                Mercoledi:
                <p className='flex flex-col'>
                  <strong>10.30am - 14.30pm</strong>
                  <strong>18.00 - 23.30pm</strong>
                </p>
              </li>
              <li className='flex flex-row mb-4 justify-between'>
                Giovedi:
                <p className='flex flex-col'>
                  <strong>10.30am - 14.30pm</strong>
                  <strong>18.00 - 23.30pm</strong>
                </p>
              </li>
              <li className='flex flex-row mb-4 justify-between'>
                Venerdi:
                <p className='flex flex-col'>
                  <strong>10.30am - 14.30pm</strong>
                  <strong>18.00 - 23.30pm</strong>
                </p>
              </li>
              <li className='flex flex-row mb-4 justify-between'>
                Sabato:
                <p className='flex flex-col'>
                  <strong>10.30am - 14.30pm</strong>
                  <strong>18.00 - 23.30pm</strong>
                </p>
              </li>
              <li className='flex flex-row mb-4 justify-between'>
                Domenica:
                <p className='flex flex-col'>
                  <strong>10.30am - 14.30pm</strong>
                  <strong>18.00 - 23.30pm</strong>
                </p>
              </li>
            </ul>
          </div>
          <div className='w-3/6 md:w-2/6 mb-6'>
            <h1 className='text-2xl mb-4'>Indirizzo</h1>
            <p className='mb-4 font-thin text-gray-500'>
              Via Roma, 40, 21018 Sesto Calende VA, Italy
            </p>
            <h1 className='text-2xl mb-4'>Chiamaci</h1>
            <p className='mb-4 font-thin text-gray-500'>+39 0331 913574</p>
            <div className='z-50 mb-6'>
              <ul className='flex flex-col sm:flex-row'>
                <li className='px-1 py-2 m-1 hover:text-blue-500'>
                  <a href='https://www.facebook.com/pages/category/Pizza-Place/Viaromanonsolopizza-108686514250214/'>
                    <i className='fab fa-facebook text-2xl' />
                  </a>
                </li>
                <li className='px-1 py-2 m-1 hover:text-blue-500'>
                  <a href='https://www.instagram.com/viaromanonsolopizza/'>
                    <i className='fab fa-instagram text-2xl' />
                  </a>
                </li>
                <li className='px-1 py-2 m-1 hover:text-blue-500'>
                  <a href='https://www.google.com/maps/place/viaROMAnonsolopizza/@45.7240617,8.6311318,15z/data=!4m5!3m4!1s0x0:0x6dc73345553ebfda!8m2!3d45.7240617!4d8.6311318'>
                    <i className='fab fa-google text-2xl' />
                  </a>
                </li>
              </ul>
            </div>
            <div className='mb-4'>
              <h2 className='text-base sm:text-xl mb-4'>Links</h2>
              <ul className='text-gray-500 font-thin flex flex-col justify-between'>
                <li className='mb-3'>
                  <Link href='/auth/login'>
                    <a>gallery admin</a>
                  </Link>
                </li>
                <li className='mb-3'>
                  <Link href='/cookie-policy'>
                    <a>Cookie Policy</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='flex flex-col sm:flex-row justify-center'>
          <div>
            <p className='text-center text-gray-500 text-xs'>
              &copy;2020 via ROMA | non solo pizza. All rights reserved.
            </p>
          </div>
          <div>
            <p className='text-center text-gray-500 text-xs sm:ml-2'>
              maintained by aolausoro.tech
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
