import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

// components
import AdminLayout from "../../../components/layout/AdminLayout";
import UploadForm from "../../../components/form/UploadForm";

import getUser from "../../../lib/getUser";

// Context
import { useGallery } from "../../../context/galleryContext";

function AddGalleryItem({ cookies }) {
  const { state, addPicture, uploadGalleryImage } = useGallery();
  console.log(state.image);
  return (
    <AdminLayout>
      <section className=" flex-grow w-full h-screen p-4 mx-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 md:p-10">
        <div className=" w-full p-4 justify-center shadow-2xl">
          <UploadForm
            addPicture={addPicture}
            uploadGalleryImage={uploadGalleryImage}
            uploading={state?.uploading}
            error={state?.error}
            image={state?.image}
            cookies={cookies}
          />
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
    props: { cookies: ctx.req.headers.cookie },
  };
};

export default AddGalleryItem;
