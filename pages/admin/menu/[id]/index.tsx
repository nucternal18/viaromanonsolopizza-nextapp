import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  Control,
} from "react-hook-form";
import { useRouter } from "next/router";

// components
import { Button } from "../../../../components";
import AdminLayout from "../../../../components/layout/AdminLayout";
import EditMenuItemForm from "../../../../components/form/EditMenuItemForm";

// context
import { useMenu } from "../../../../context/menuContext";

// utils
import { NEXT_URL } from "../../../../config";
import getUser from "../../../../lib/getUser";
import { IFormData } from "../../../../lib/types";

function EditMenuItem({ menuItem, menuType, id }) {
  const router = useRouter();
  const { state, updateMenuItem } = useMenu();
  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: {
      name: menuItem?.name,
      name_english: menuItem?.name_english,
      ingredients: menuItem?.ingredients,
      price: menuItem?.price,
      menuType: menuType,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    const menuDetails = {
      name: data.name,
      name_english: data.name_english,
      ingredients: data.ingredients,
      price: data.price,
    };
    console.log(menuDetails);
    // updateMenuItem(menuType, id, menuDetails);
  };
  return (
    <AdminLayout>
      <section className=" flex-grow w-full h-screen  mx-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 md:p-4">
        <div className="px-4 py-2 flex items-center justify-between border-b-2 my-4">
          <div>
            <h2 className="text-xl font-mono">Edit Menu Item</h2>{" "}
          </div>
          <div>
            <Button
              type="button"
              color="warning"
              onClick={() => router.replace("/admin/menu")}
            >
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
            fields={fields}
            remove={remove}
            append={append}
          />
        </div>
      </section>
    </AdminLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const req = ctx.req;
  const session = await getSession({ req });
  const { id, type } = ctx.query;
  console.log(type);

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

  const res = await fetch(`${NEXT_URL}/api/menu/${id}?type=${type}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      cookie: req.headers.cookie,
    },
  });
  const data = await res.json();

  return {
    props: { menuItem: data, menuType: type, id },
  };
};

export default EditMenuItem;
