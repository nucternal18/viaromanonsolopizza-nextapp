import { GetStaticProps } from "next";
import React, { useMemo } from "react";

//components
import AdminLayout from "../../components/layout/AdminLayout";
import Table, { SelectColumnFilter } from "../../components/MenuTable";
import { NEXT_URL } from "../../config";
// Context
import { useMenu } from "../../context/menuContext";

function ManageMenu({ menu }) {
  const { state } = useMenu();
  console.log(menu);
  const data = useMemo(
    () => [
      { antipasti: menu.antipasti },
      { contorni: menu.contorni },
      { letempure: menu.letempure },
      { secondi: menu.secondi },
      { desserts: menu.desserts },
      { gourmetpizza: menu.gourmetpizza },
      { pizzas: menu.pizzas },
      { cantina: menu.cantina },
      { bianche: menu.bianche },
    ],
    [menu]
  );
  console.log(data);
  const columns = useMemo(
    () => [
      {
        Header: "Main",
        accessor: "main",
        columns: [
          {
            Header: "Id",
            accessor: "main.id",
          },
          {
            Header: "Title",
            accessor: "main.title",
          },
        ],
        Filter: SelectColumnFilter,
      },
      {
        Header: "Desserts",
        accessor: "desserts",
        columns: [
          {
            Header: "Id",
            accessor: "desserts.id",
          },
          {
            Header: "Title",
            accessor: "desserts.title",
          },
        ],
        Filter: SelectColumnFilter,
      },
      {
        Header: "Gourmet Pizza",
        accessor: "gourmetpizza",
        columns: [
          {
            Header: "Id",
            accessor: "gourmetpizza.id",
          },
          {
            Header: "Title",
            accessor: "gourmetpizza.title",
          },
        ],
        Filter: SelectColumnFilter,
      },
      {
        Header: "Pizzas",
        accessor: "pizzas",
        columns: [
          {
            Header: "Id",
            accessor: "pizzas.id",
          },
          {
            Header: "Title",
            accessor: "pizzas.title",
          },
        ],
        Filter: SelectColumnFilter,
      },
      {
        Header: "Cantina",
        accessor: "cantina",
        columns: [
          {
            Header: "Id",
            accessor: "cantina.id",
          },
          {
            Header: "Title",
            accessor: "cantina.title",
          },
        ],
        Filter: SelectColumnFilter,
      },
      {
        Header: "Bianche",
        accessor: "bianche",
        columns: [
          {
            Header: "Id",
            accessor: "bianche.id",
          },
          {
            Header: "Title",
            accessor: "bianche.title",
          },
        ],
        Filter: SelectColumnFilter,
      },
    ],
    []
  );
  return (
    <AdminLayout title="Manage menu">
      <section className=" flex-grow w-full h-screen p-4 mx-auto bg-gray-100 md:p-10">
        <div className="bg-white w-full min-h-full text-center shadow-2xl p-4">
          <h1>Manage Menu</h1>
          {/* <div>
            <Table columns={columns} data={data} />
          </div> */}
        </div>
      </section>
    </AdminLayout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch(`${NEXT_URL}/api/menu`);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { menu: data },
    revalidate: 5,
  };
};

export default ManageMenu;
