import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

// components
import AdminLayout from "../../../components/layout/AdminLayout";
import UploadForm from "../../../components/UploadForm";

import getUser from "../../../lib/getUser";

// Context
import { useGallery } from "../../../context/galleryContext";

function AddGalleryItem() {
  const { state, addPicture, deletePicture, uploadGalleryImage } = useGallery();
  return (
    <AdminLayout>
      <section className=" flex-grow w-full h-screen p-4 mx-auto bg-gray-100 md:p-10">
        <div className="bg-white w-full p-4 justify-center shadow-2xl">
          <UploadForm
            addPicture={addPicture}
            uploadGalleryImage={uploadGalleryImage}
            uploading={state.uploading}
            error={state.error}
            image={state.image.url}
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

export default AddGalleryItem;
