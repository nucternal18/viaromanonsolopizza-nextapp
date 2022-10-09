import React, { useCallback, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

// redux
import { useAppSelector } from "@app/hooks";
import {
  useDeleteImageMutation,
  useGetImagesQuery,
} from "@features/gallery/galleryApiSlice";
import { gallerySelector } from "@features/gallery/gallerySlice";

// Components
import AdminLayout from "../../../components/layout/AdminLayout";
import GalleryFilterForm from "../../../components/form/GalleryFilterForm";
import GalleryContainer from "../../../components/GalleryContainer";

// utils & lib
import { NEXT_URL } from "../../../config";
import { Session } from "next-auth";

interface IFormData {
  sort: string;
  sortOptions: string[];
}

function ManageGallery({ pictures, loading }) {
  const router = useRouter();
  const { page, sort, sortOptions } = useAppSelector(gallerySelector);
  const [deleteImage, { isLoading }] = useDeleteImageMutation();
  const { register, watch } = useForm<IFormData>({
    defaultValues: {
      sort: sort,
    },
  });

  useEffect(() => {
    const subscribe = watch((data) => {
      const url = `${NEXT_URL}/admin/gallery?page=${page}&sort=${data.sort}`;
      router.replace(url);
    });
    return () => subscribe.unsubscribe();
  }, [watch, page]);

  const deleteHandler = useCallback(async (id: string) => {
    try {
      const response = await deleteImage(id).unwrap();
      toast.success(response.message ?? "Immagine cancellata con successo", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      toast.error(
        error.message ?? "errore durante l'eliminazione dell'immagine",
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
    }
  }, []);

  return (
    <AdminLayout>
      <section className=" flex-grow w-full  p-4 mx-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 md:p-10">
        <div className=" w-full min-h-full p-4 justify-center ">
          <GalleryFilterForm register={register} sortOptions={sortOptions} />
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
  const session: Session = await getSession({ req });
  if (!session) {
    // If no token is present redirect user to the login page
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  if (!session.user.isAdmin) {
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
