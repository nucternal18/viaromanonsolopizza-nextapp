import Image from 'next/image';
import Layout from '../components/Layout';
import dynamic from 'next/dynamic';

import { useMenu } from '../context/menuContext';
const Menu = dynamic(() => import('../components/PageComponents/Menu'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
// const Slider = dynamic(() => import('../components/Slider/Slider'), {
//   ssr: false,
//   loading: () => <p>Loading...</p>,
// });
const url =
  'https://res.cloudinary.com/viaromanonsolopizza-com/image/upload/v1633902787/danielle-macinnes-logv9s7f67o-unsplash_c37kov.webp';
export default function Home() {
  const { state } = useMenu();
  return (
    <Layout title='Home'>
      <main >
        <section className='relative flex items-center content-center justify-center h-screen pt-16 pb-32'>
          <div className='absolute top-0 w-full h-full bg-center bg-cover'>
            <Image
              src={url}
              alt='Photo by <a href="https://unsplash.com/@dsmacinnes?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Danielle MacInnes</a> on <a href="https://unsplash.com/s/photos/pizza?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>'
              layout='fill'
              objectFit='cover'
              quality={75}
              loading='lazy'
            />
            <span
              id='blackOverlay'
              className='absolute w-full h-full bg-black opacity-50'></span>
          </div>
        </section>
        {/* <Slider /> */}

        <Menu menu={state.menu} loading={state.loading} />
      </main>
    </Layout>
  );
}
