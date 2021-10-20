import React from "react";
import { toast } from "react-toastify";

// Context
import { useGallery } from "../../context/galleryContext";

// Components
import Table from "../../components/GalleryTable";
import AdminLayout from "../../components/layout/AdminLayout";
import UploadForm from "../../components/UploadForm";
import { uploadImage } from "../../lib/upload";

type RowProps = {
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  url: string;
  id: string;
};

function ManageGallery() {
  const { state, addPicture, deletePicture, uploadGalleryImage } = useGallery();

  const deleteHandler = (id: string) => {
    deletePicture(id);
    if (state.success) {
      toast.success(state.message);
    }
  };

  return (
    <AdminLayout>
      <section className=" flex-grow w-full h-screen p-4 mx-auto bg-gray-100 md:p-10">
        <div className="bg-white w-full min-h-full p-4 justify-center shadow-2xl">
          <UploadForm
            addPicture={addPicture}
            uploadGalleryImage={uploadGalleryImage}
            uploading={state.uploading}
            error={state.error}
            image={state.image.url}
          />
          <div>
            <div className="w-full mx-auto overscroll-auto">
              <Table
                tableData={state.images}
                headingColumns={["ID", "IMAGE", "CREATED AT", "ACTIONS"]}
                deleteHandler={deleteHandler}
              />
            </div>
          </div>
        </div>
      </section>
    </AdminLayout>
  );
}

export default ManageGallery;
