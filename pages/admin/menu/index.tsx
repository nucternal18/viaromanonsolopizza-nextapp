import { GetServerSideProps } from "next";
import React, { useCallback, useEffect, useMemo } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

//components
import AdminLayout from "../../../components/layout/AdminLayout";
import Table from "../../../components/MenuTable";
import { MenuFilterForm } from "../../../components";
import CantinaTable from "../../../components/MenuTable/cantinaTable";

// redux
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { menuSelector } from "@features/menu/menuSlice";
import {
  useDeleteMenuMutation,
  useGetMenuByTypeQuery,
} from "@features/menu/menuApiSlice";

// utils
import { NEXT_URL } from "../../../config";
import { IFormData } from "../../../lib/types";
import { Session } from "next-auth";
import Loader from "@components/Loader";

function ManageMenu() {
  const router = useRouter();
  const { menuType, sort, page: pageNum } = useAppSelector(menuSelector);
  const {
    data: menu,
    isLoading,
    refetch,
  } = useGetMenuByTypeQuery({ sort, menuType });

  const [deleteMenu] = useDeleteMenuMutation();

  const page = pageNum || 1;
  const {
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm<Partial<IFormData>>({
    defaultValues: {
      sort: sort,
      menuType: menuType,
    },
  });

  const handleDelete = useCallback(async (id: string) => {
    try {
      const response = await deleteMenu(id).unwrap();
      if (response.success) {
        toast.success(response.message ?? "Item deleted successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        refetch();
      }
    } catch (error: any) {
      toast.error(error.message ?? "Something went wrong", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, []);

  if (isLoading) {
    return (
      <AdminLayout title="Manage menu">
        <section className=" flex-grow w-full h-screen mx-auto text-gray-900 dark:text-gray-200 md:p-4">
          <MenuFilterForm register={register} errors={errors} reset={reset} />
          <div className="my-4 h-[500px] flex items-center justify-center mx-auto sm:max-w-screen-xl">
            <Loader classes="w-12 h-12" />
          </div>
        </section>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Manage menu">
      <section className=" flex flex-col w-full mx-auto  text-gray-900 dark:text-gray-200 md:p-4">
        <MenuFilterForm register={register} errors={errors} reset={reset} />
        <div className="my-4 mx-auto w-full flex-grow sm:max-w-screen-xl">
          <h1 className="text-xl mb-4 font-mono ml-2">Manage Menu</h1>
          <div>
            {menuType === "CANTINA" ? (
              <CantinaTable
                data={menu}
                handleDelete={handleDelete}
                menuType={menuType}
              />
            ) : (
              <Table
                data={menu}
                menuType={menuType}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </section>
    </AdminLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const req = ctx.req;
  const session: Session = await getSession({ req });

  if (!session) {
    // If no token is present redirect user to the login page
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  if (!session.user.isAdmin) {
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
};

export default ManageMenu;
