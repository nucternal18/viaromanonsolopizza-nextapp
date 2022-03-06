import React, { useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

// Context
import { useGallery } from "../../../context/galleryContext";

// Components

import AdminLayout from "../../../components/layout/AdminLayout";
import getUser from "../../../lib/getUser";
import { NEXT_URL } from "../../../config";
import GalleryFilterForm from "../../../components/form/GalleryFilterForm";
import GalleryContainer from "../../../components/GalleryContainer";

interface IFormData {
  sort: string;
  sortOptions: string[];
}

function ManageGallery({ pictures, loading }) {
  const { state, deletePicture } = useGallery();
  const router = useRouter();
  const { register, watch } = useForm<IFormData>({
    defaultValues: {
      sort: state?.sort,
    },
  });

  useEffect(() => {
    const url = `${NEXT_URL}/admin/gallery?page=${state?.page}`;
    router.replace(url);
  }, [state?.page]);

  useEffect(() => {
    const subscribe = watch((data) => {
      const { sort } = data;
      const url = `${NEXT_URL}/admin/gallery?page=${state?.page}&sort=${sort}`;
      router.replace(url);
    });
    return () => subscribe.unsubscribe();
  }, [watch, state?.page]);

  const deleteHandler = (id: string) => {
    deletePicture(id);
    router.reload();
  };

  return (
    <AdminLayout>
      <section className=" flex-grow w-full h-screen p-4 mx-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 md:p-10">
        <div className=" w-full min-h-full p-4 justify-center ">
          <GalleryFilterForm
            register={register}
            sortOptions={state?.sortOptions}
          />
          <GalleryContainer
            deleteHandler={deleteHandler}
            gallery={pictures}
            isLoading={loading}
          />
        </div>
      </section>
    </AdminLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const req = ctx.req;
  const { page, sort } = ctx.query;
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

  const user = await getUser(req);

  if (!user.isAdmin) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const res = await fetch(`${NEXT_URL}/api/gallery?page=${page}&sort=${sort}`, {
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
};

export default ManageGallery;
