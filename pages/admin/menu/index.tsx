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
import CantinaTable from "../../../components/MenuTable/cantinaTable";

interface IFormData {
  sort: string;
  sortOptions: string[];
  menuType: string;
  menuTypeOptions: string[];
}

function ManageMenu({ menu, cookie }) {
  const router = useRouter();
  const { state, deleteCantinaMenuItem } = useMenu();

  const page = state?.page || 1;
  const {
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: {
      sort: state?.sort,
      menuType: state?.menuType,
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

  return (
    <AdminLayout title="Manage menu">
      <section className=" flex-grow w-full h-screen mx-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 md:p-4">
        <MenuFilterForm register={register} errors={errors} reset={reset} />
        <div className="my-4 mx-auto sm:max-w-screen-xl">
          <h1 className="text-xl mb-4 font-mono ml-2">Manage Menu</h1>
          <div>
            {state?.menuType === "cantina" ? (
              <CantinaTable
                data={menu}
                deleteItem={deleteCantinaMenuItem}
                cookie={cookie}
              />
            ) : (
              <Table data={menu} />
            )}
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

  const url = `/menu?page=${page || 1}&sort=${sort || "latest"}&menuType=${
    menuType || "antipasti"
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
    props: { menu: data, cookie: req.headers.cookie },
  };
};

export default ManageMenu;
