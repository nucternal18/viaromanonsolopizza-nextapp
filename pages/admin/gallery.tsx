import React, { useMemo } from "react";
import { toast } from "react-toastify";

// Context
import { useGallery } from "../../context/galleryContext";

// Components
import Table, {
  ActionsCell,
  ImageCell,
  TimeCell,
} from "../../components/GalleryTable";
import AdminLayout from "../../components/layout/AdminLayout";
import UploadForm from "../../components/UploadForm";

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
      <section className=" flex-grow w-full h-screen p-4 mx-auto bg-gray-100 md:p-10">
        <div className="bg-white w-full min-h-full p-4 justify-center shadow-2xl">
          <UploadForm
            addPicture={addPicture}
            uploadGalleryImage={uploadGalleryImage}
            uploading={state.uploading}
            error={state.error}
            image={state.image.url}
          />

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

export default ManageGallery;
