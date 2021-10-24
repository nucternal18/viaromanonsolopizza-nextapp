import React, { useMemo } from "react";

//components
import AdminLayout from "../../components/layout/AdminLayout";
import Table, { SelectColumnFilter } from "../../components/MenuTable";
// Context
import { useMenu } from "../../context/menuContext";
import useFirestore from "../../lib/hooks/useFirestore";

function ManageMenu() {
  const { state } = useMenu();
  const { docs } = useFirestore("Menus");
  const data = useMemo(
    () => [
      { main: state.menu.main },
      { desserts: state.menu.desserts },
      { gourmetpizza: state.menu.gourmetpizza },
      { pizzas: state.menu.pizzas },
      { cantina: state.menu.cantina },
      { bianche: state.menu.bianche },
    ],
    [state.menu]
  );
  // console.log(data)
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

export default ManageMenu;
