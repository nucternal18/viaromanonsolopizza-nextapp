import dynamic from 'next/dynamic';
import Layout from '../components/Layout';

import { useMenu } from '../context/menuContext';
const Menu = dynamic(() => import('../components/PageComponents/Menu'), {
    ssr: false,
  loading: () => <p>Loading...</p>,
});



const MainMenu = () => {
    const {state} = useMenu()
 
  return (
    <Layout>
      <Menu menu={state.menu} loading={state.loading} />
    </Layout>
  );
};

export default MainMenu;
