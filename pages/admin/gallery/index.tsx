import React, { useMemo } from "react";
import { toast } from "react-toastify";
import nookies from "nookies";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

// Context
import { useGallery } from "../../../context/galleryContext";

// Components
import Table, {
  ActionsCell,
  ImageCell,
  TimeCell,
} from "../../../components/GalleryTable";
import AdminLayout from "../../../components/layout/AdminLayout";
import getUser from "../../../lib/getUser";
import { NEXT_URL } from "../../../config";

function ManageGallery({ pictures, loading }) {
  const { state, deletePicture } = useGallery();

  const deleteHandler = (id: string) => {
    deletePicture(id);
    if (state.success) {
      toast.success(state.message);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        Footer: "ID",
        accessor: "id",
      },
      {
        Header: "IMAGE",
        Footer: "IMAGE",
        accessor: "url",
        Cell: ImageCell,
      },
      {
        Header: "CREATED AT",
        Footer: "CREATED AT",
        accessor: "createdAt",
        Cell: TimeCell,
      },
      {
        Header: "ACTIONS",
        Footer: "ACTIONS",
        Cell: ({ value }) => ActionsCell(value, deleteHandler),
      },
    ],
    []
  );

  return (
    <AdminLayout>
      <section className=" flex-grow w-full h-screen p-4 mx-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 md:p-10">
        <div className=" w-full min-h-full p-4 justify-center shadow-2xl">
          <div className="w-full mx-auto overscroll-auto">
            <Table
              data={state.images}
              columns={columns}
              deleteHandler={deleteHandler}
            />
          </div>
        </div>
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
    const res = await fetch(`${NEXT_URL}/api/gallery`, {
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
      props: { pictures: data, loading: !data ? true : false },
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

export default ManageGallery;
