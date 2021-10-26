import Image from "next/image";
import Layout from "../components/layout/Layout";
import dynamic from "next/dynamic";
import Link from "next/link";

import { useMenu } from "../context/menuContext";
import Contact from "../components/PageComponents/Contact";
import { motion } from "framer-motion";
import Button from "../components/Button/GlobalButton";
import Loader from "../components/Loader";
import { GetServerSideProps } from "next";
import { NEXT_URL } from "../config";
const Menu = dynamic(() => import("../components/PageComponents/Menu"), {
  ssr: false,
  loading: () => (
    <div className="mx-auto w-full py-10">
      <Loader classes="w-6 h-6" />
    </div>
  ),
});

const url =
  "https://res.cloudinary.com/viaromanonsolopizza-com/image/upload/v1633902787/danielle-macinnes-logv9s7f67o-unsplash_c37kov.webp";
export default function Home({ menu, loading }) {
  const { state } = useMenu();
  return (
    <Layout title="Home">
      <main>
        <section className="relative flex items-center content-center justify-center h-screen pt-16 pb-32">
          <div className="absolute top-0 w-full h-full bg-center bg-cover">
            <Image
              src={url}
              alt='Photo by <a href="https://unsplash.com/@dsmacinnes?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Danielle MacInnes</a> on <a href="https://unsplash.com/s/photos/pizza?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>'
              layout="fill"
              objectFit="cover"
              quality={75}
              loading="lazy"
            />
            <span
              id="blackOverlay"
              className="absolute w-full h-full bg-black opacity-40"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="flex flex-wrap items-center justify-center ">
              <motion.div
                className="flex flex-col items-center opacity-75"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
                transition={{ duration: 2.0 }}
              >
                <p className="mb-2 text-lg font-thin text-gray-300 text-center md:text-2xl ">
                  Benvenuti in Via Roma | non Solo Pizza
                </p>
                <p className="mb-4 text-2xl text-center font-semibold text-gray-300 sm:text-3xl md:text-4xl ">
                  Dalla passione per la pizza coltivata da un sogno alla
                  realizzazione
                </p>
                <Button type="button" color="warning">
                  <Link href="/menu">
                    <a>View Menu</a>
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        <Menu menu={menu} loading={loading} />
        <Contact />
      </main>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`${NEXT_URL}/api/menu`);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { menu: data, loading: !data ? true : false },
  };
};
