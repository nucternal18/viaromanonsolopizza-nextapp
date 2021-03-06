import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Layout from "../components/layout/Layout";
import { NEXT_URL } from "../config";

const Menu = dynamic(() => import("../components/PageComponents/Menu"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
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
