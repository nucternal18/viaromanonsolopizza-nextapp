import { GetServerSideProps } from "next";
import nookies from "nookies";
import getUser from "../../../lib/getUser";

function EditMenuItem() {
  return <div></div>;
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

export default EditMenuItem;
