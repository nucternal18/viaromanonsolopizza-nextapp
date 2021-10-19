import React from "react";
import Table from "../../components/GalleryTable";
import AdminLayout from "../../components/layout/AdminLayout";
import useFirestore from "../../lib/hooks/useFirestore";

type RowProps = {
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  url: string;
  id: string;
};

function ManageGallery() {
  const { docs } = useFirestore("images");

  const deleteHandler = (id: string) => {};
  return (
    <AdminLayout>
      <section className=" flex-grow w-full h-screen p-4 mx-auto bg-gray-100 md:p-10">
        <div className="bg-white w-full min-h-full p-2 justify-center shadow-2xl">
          <div>
            <h1>Manage Galleria</h1>
          </div>
          <div>
            <div className="w-full mx-auto overscroll-auto">
              <Table
                tableData={docs}
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
