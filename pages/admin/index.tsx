import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import AdminLayout from "../../components/layout/AdminLayout";
import getUser from "../../lib/getUser";

function Admin() {
  return (
    <AdminLayout title="Admin Home">
      <section className="flex items-center justify-center flex-grow w-full h-screen px-4 mx-auto  md:px-10">
        <h1 className="text-2xl">Welcome to Via Roma Non Solo Pizza</h1>
      </section>
    </AdminLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const req = ctx.req;
  const session = await getSession({ req });
  if (!session) {
    // If no token is present redirect user to the login page
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  try {
    const user = await getUser(req);

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
