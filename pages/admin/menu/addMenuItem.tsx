import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import AdminLayout from "../../../components/layout/AdminLayout";
import { NEXT_URL } from "../../../config";
import getUser from "../../../lib/getUser";

function AddMenuItem({ menuItem, loading }) {
  console.log(menuItem);
  return (
    <AdminLayout>
      <section className=" flex-grow w-full  mx-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 md:p-4">
        AddItem
      </section>
    </AdminLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const req = ctx.req;
  const session = await getSession({ req });
  const { id } = ctx.query;
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
    const res = await fetch(`${NEXT_URL}/api/menu/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (!data) {
      return {
        notFound: true,
      };
    }

    return {
      props: { menuItem: data, loading: !data ? true : false },
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

export default AddMenuItem;
