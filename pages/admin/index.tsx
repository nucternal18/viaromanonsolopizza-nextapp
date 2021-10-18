import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";

function Admin() {
  return (
    <AdminLayout title="Admin Home">
      <section className="flex items-center justify-center flex-grow w-full h-screen px-4 mx-auto  md:px-10">
        <h1 className="text-2xl">Welcome to Blooms hair</h1>
      </section>
    </AdminLayout>
  );
}

export default Admin;
