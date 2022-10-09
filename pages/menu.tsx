import Loader from "@components/Loader";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import Layout from "../components/layout/Layout";
import { NEXT_URL } from "../config";

const Menu = dynamic(() => import("../components/PageComponents/Menu"), {
  ssr: false,
  loading: () => (
    <div className="mx-auto h-[700px] flex items-center justify-center w-full py-10">
      <Loader classes="w-12 h-12" />
    </div>
  ),
});

const MainMenu = ({ menu, loading }) => {
  return (
    <Layout>
      <Menu menu={menu} loading={loading} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await fetch(`${NEXT_URL}/api/menu/menu`);
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

export default MainMenu;
