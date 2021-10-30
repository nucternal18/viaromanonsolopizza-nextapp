import { GetServerSideProps } from "next";
import { getAuth } from "firebase-admin/auth";
import nookies from "nookies";
import AdminLayout from "../../components/layout/AdminLayout";
import { defaultFirestore } from "../../config/firebaseAdmin";
import getUser from "../../lib/getUser";

function Admin() {
  return (
    <AdminLayout title="Admin Home">
      <section className="flex items-center justify-center flex-grow w-full h-screen px-4 mx-auto  md:px-10">
        <h1 className="text-2xl">Welcome to Blooms hair</h1>
      </section>
    </AdminLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);

    if (!cookies.token) {
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      };
    }
    const { user } = await getUser(cookies.token);

    if (!user.isAdmin) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    return {
      props: {},
    };
  } catch (error) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    ctx.res.writeHead(302, { Location: "/auth/login" });
    ctx.res.end();

    // `as never` prevents inference issues
    // with InferGetServerSidePropsType.
    // The props returned here don't matter because we've
    // already redirected the user.
    return { props: {} as never };
  }
};

export default Admin;
