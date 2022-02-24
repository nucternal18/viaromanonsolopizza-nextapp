import { GetServerSideProps } from "next";
import React, { useEffect, useMemo } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

//components
import AdminLayout from "../../../components/layout/AdminLayout";
import Table from "../../../components/MenuTable";
import { NEXT_URL } from "../../../config";
// Context
import { useMenu } from "../../../context/menuContext";
import getUser from "../../../lib/getUser";
import { MenuFilterForm } from "../../../components";

interface IFormData {
  sort: string;
  sortOptions: string[];
  menuType: string;
  menuTypeOptions: string[];
}

function ManageMenu({ menu }) {
  const router = useRouter();
  const { state } = useMenu();
  const antiPastiMenuData = useMemo(() => [...menu.antipasti], [menu]);
  const page = state.page;
  const {
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: {
      sort: state.sort,
      menuType: state.menuType,
    },
  });

  useEffect(() => {
    const subscribe = watch((data) => {
      const { sort, menuType } = data;
      const url = `${NEXT_URL}/admin/menu?page=${page}&sort=${sort}&menuType=${menuType}`;

      router.replace(url);
    });
    return () => subscribe.unsubscribe();
  }, [watch, page]);

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "_id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Name_English",
        accessor: "name_english",
      },
      {
        Header: "Price",
        accessor: "price",
      },
    ],

    // {
    //   Header: 'Contorni',
    //   accessor: 'contorni',
    //   columns: [
    //     {
    //       Header: 'Id',
    //       accessor: 'contorni._id',
    //     },
    //     {
    //       Header: 'Name',
    //       accessor: 'contorni.name',
    //     },
    //     {
    //       Header: 'Name_English',
    //       accessor: 'contorni.name_english',
    //     },
    //     {
    //       Header: 'Price',
    //       accessor: 'contorni.price',
    //     },
    //   ],
    //   Filter: SelectColumnFilter,
    // },
    // {
    //   Header: 'Letempure',
    //   accessor: 'letempure',
    //   columns: [
    //     {
    //       Header: 'Id',
    //       accessor: 'letempure._id',
    //     },
    //     {
    //       Header: 'Name',
    //       accessor: 'letempure.name',
    //     },
    //     {
    //       Header: 'Name_English',
    //       accessor: 'letempure.name_english',
    //     },
    //     {
    //       Header: 'Price',
    //       accessor: 'letempure.price',
    //     },
    //   ],
    //   Filter: SelectColumnFilter,
    // },
    // {
    //   Header: 'Secondi',
    //   accessor: 'secondi',
    //   columns: [
    //     {
    //       Header: 'Id',
    //       accessor: 'secondi._id',
    //     },
    //     {
    //       Header: 'Name',
    //       accessor: 'secondi.name',
    //     },
    //     {
    //       Header: 'Name_English',
    //       accessor: 'secondi.name_english',
    //     },
    //     {
    //       Header: 'Price',
    //       accessor: 'secondi.price',
    //     },
    //   ],
    //   Filter: SelectColumnFilter,
    // },
    // {
    //   Header: 'Desserts',
    //   accessor: 'desserts',
    //   columns: [
    //     {
    //       Header: 'Id',
    //       accessor: 'desserts._id',
    //     },
    //     {
    //       Header: 'Name',
    //       accessor: 'desserts.name',
    //     },
    //   ],
    //   Filter: SelectColumnFilter,
    // },
    // {
    //   Header: 'Gourmet Pizza',
    //   accessor: 'gourmetpizza',
    //   columns: [
    //     {
    //       Header: 'Id',
    //       accessor: 'gourmetpizza._id',
    //     },
    //     {
    //       Header: 'Name',
    //       accessor: 'gourmetpizza.name',
    //     },
    //     {
    //       Header: 'Price',
    //       accessor: 'gourmetpizza.price',
    //     },
    //   ],
    //   Filter: SelectColumnFilter,
    // },
    // {
    //   Header: 'Pizzas',
    //   accessor: 'pizzas',
    //   columns: [
    //     {
    //       Header: 'Id',
    //       accessor: 'pizzas._id',
    //     },
    //     {
    //       Header: 'Name',
    //       accessor: 'pizzas.name',
    //     },
    //     {
    //       Header: 'Price',
    //       accessor: 'pizzas.price',
    //     },
    //   ],
    //   Filter: SelectColumnFilter,
    // },
    // {
    //   Header: 'Cantina',
    //   accessor: 'cantina',
    //   columns: [
    //     {
    //       Header: 'Id',
    //       accessor: 'cantina.id',
    //     },
    //     {
    //       Header: 'Subtitle',
    //       accessor: 'cantina.subtitle',
    //     },
    //     {
    //       Header: 'Types',
    //       accessor: 'cantina.types',
    //       columns: [
    //         {Header: 'Id', accessor: 'cantina.types._id'},
    //         {
    //           Header: 'Bottiglia',
    //           accessor: 'cantina.types.Bottiglia',
    //         },
    //         {
    //           Header: 'Calice',
    //           accessor: 'cantina.types.Calice',
    //         },
    //         {
    //           Header: 'Name',
    //           accessor: 'cantina.types.name',
    //         },
    //       ],
    //     },
    //   ],
    //   Filter: SelectColumnFilter,
    // },
    // {
    //   Header: 'Bianche',
    //   accessor: 'bianche',
    //   columns: [
    //     {
    //       Header: 'Id',
    //       accessor: 'bianche.id',
    //     },
    //     {
    //       Header: 'Name',
    //       accessor: 'bianche.name',
    //     },
    //     {
    //       Header: 'Price',
    //       accessor: 'bianche.price',
    //     },
    //   ],
    //   Filter: SelectColumnFilter,
    // },

    []
  );
  return (
    <AdminLayout title="Manage menu">
      <section className=" flex-grow w-full h-screen p-4 mx-auto bg-gray-100 md:p-10">
        <MenuFilterForm register={register} errors={errors} reset={reset} />
        <div className="bg-white w-full min-h-full text-center shadow-2xl p-4">
          <h1>Manage Menu</h1>
          <div>
            <Table columns={columns} data={antiPastiMenuData} />
          </div>
        </div>
      </section>
    </AdminLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const req = ctx.req;
  const session = await getSession({ req });
  const { sort, menuType, page } = ctx.query;
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

  const url = `/menu?page=${page || 1}&sort=${sort || "all"}&menuType=${
    menuType || "all"
  }`;

  const res = await fetch(`${NEXT_URL}/api/${url}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      cookie: req.headers.cookie,
    },
  });
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { menu: data, loading: !data ? true : false },
  };
};

export default ManageMenu;
