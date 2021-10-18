import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";

function ManageGallery() {
  return (
    <AdminLayout>
      <section className=" flex-grow w-full h-screen p-4 mx-auto bg-gray-100 md:p-10">
        <div className="bg-white w-full min-h-full flex items-center justify-center shadow-2xl">
          <h1>Manage Galleria</h1>
        </div>
      </section>
    </AdminLayout>
  );
}

export default ManageGallery;
