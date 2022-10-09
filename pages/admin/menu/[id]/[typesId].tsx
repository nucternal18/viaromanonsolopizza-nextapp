import { useCallback, useEffect } from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

// components
import { Button } from "../../../../components";
import AdminLayout from "../../../../components/layout/AdminLayout";
import EditMenuItemForm from "../../../../components/form/EditMenuItemForm";

// utils
import { NEXT_URL } from "../../../../config";
import getUser from "../../../../lib/getUser";
import { IFormData } from "../../../../lib/types";

// redux
import { useUpdateMenuMutation } from "@features/menu/menuApiSlice";

function EditMenuItem({ menuItem, menuType, typesId, id, cookies }) {
  const router = useRouter();
  const [updateMenu, { isLoading }] = useUpdateMenuMutation();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: {
      name: menuItem.name,
      Bottiglia: menuItem.Bottiglia,
      Calice: menuItem.Calice,
      menuType: menuType,
    },
  });

  const onSubmit: SubmitHandler<IFormData> = useCallback(async (data) => {
    const menuDetails = {
      name: data.name,
      Bottiglia: data.Bottiglia,
      Calice: data.Calice,
      typesId,
    };
    try {
      const response = await updateMenu({
        id: id,
        menuDetails: menuDetails,
      }).unwrap();
      if (response.success) {
        toast.success(response.message ?? "Menu aggiornato con successo", {
          position: toast.POSITION.TOP_CENTER,
        });
        router.push("/admin/menu");
      }
    } catch (error) {
      toast.error(error.message ?? "Errore durante l'aggiornamento del menu", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, []);

  return (
    <AdminLayout>
      <section className=" flex-grow w-full h-screen mx-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 md:p-4">
        <div className="px-4 py-2 flex items center justify-between border-b-2 mt-4">
          <div>
            <h2 className="text-xl font-mono">Edit Menu Item</h2>{" "}
          </div>
          <div>
            <Button type="button" color="warning">
              Go Back
            </Button>
          </div>
        </div>
        <div className="w-full max-w-screen-lg mx-auto mt-4">
          <EditMenuItemForm
            register={register}
            errors={errors}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            reset={reset}
            menuType={menuType}
            isLoading={isLoading}
          />
        </div>
      </section>
    </AdminLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const req = ctx.req;
  const session = await getSession({ req });
  const { id, typesId, type } = ctx.query;

  if (!session) {
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

  const res = await fetch(
    `${NEXT_URL}/api/menu/${id}?type=${type}&typesId=${typesId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        cookie: req.headers.cookie,
      },
    }
  );
  const data = await res.json();

  return {
    props: {
      menuItem: data,
      menuType: type,
      id,
      typesId,
      cookies: req.headers.cookie,
    },
  };
};

export default EditMenuItem;
