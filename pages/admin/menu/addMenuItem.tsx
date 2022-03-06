import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";

// components
import AdminLayout from "../../../components/layout/AdminLayout";

// context
import { useMenu } from "../../../context/menuContext";

// utils
import getUser from "../../../lib/getUser";
import { AddMenuItemForm } from "../../../components/form/AddMenuItemForm";
import { IFormData } from "../../../lib/types";
import { toast } from "react-toastify";

function AddMenuItem({ cookies }) {
  const { state, addMenuItem } = useMenu();
  const [type, setType] = useState("");

  const {
    register,
    reset,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<IFormData>>({
    defaultValues: {
      name: "",
      name_english: "",
      ingredients: [{ content: "" }],
      price: "0,00",
      types: [{ name: "", Bottiglia: "", Calice: "" }],
    },
  });

  useEffect(() => {
    const subscribe = watch((data) => {
      const { menuType } = data;
      setType(menuType);
    });
    return () => subscribe.unsubscribe();
  }, [watch]);

  const {
    fields: ingredientsFields,
    append: ingredientsAppend,
    remove: ingredientsRemove,
  } = useFieldArray({
    control,
    name: "ingredients",
  });
  const {
    fields: typesField,
    append: typesAppend,
    remove: typesRemove,
  } = useFieldArray({
    control,
    name: "types",
  });

  useEffect(() => {
    if (state?.isError) {
      toast.error(state?.error);
    }
    if (state?.success) {
      toast.success(state?.message);
    }
  }, [state?.success, state?.isError, state?.error, state?.message]);

  const onSubmit: SubmitHandler<Partial<IFormData>> = (data) => {
    const newIngredients = data?.ingredients?.map((ingredient) => {
      return ingredient["content"];
    });

    const menuDetails = {
      name: data?.name,
      name_english: data?.name_english,
      ingredients: newIngredients,
      subtitle: data?.subtitle || "",
      price: data?.price,
      types: data?.types || [],
      type: data?.menuType,
    };

    addMenuItem(menuDetails, cookies);
    reset();
  };

  return (
    <AdminLayout>
      <section className=" flex-grow w-full h-screen  mx-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 md:p-4">
        <div className="flex items-center justify-between border-b-2 p-4">
          <div>
            <h2 className="text-xl font-mono">Add Menu Item</h2>{" "}
          </div>
        </div>
        <div className="w-full max-w-screen-lg mx-auto mt-4">
          <AddMenuItemForm
            menuType={type}
            register={register}
            errors={errors}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            reset={reset}
            typesField={typesField}
            ingredientsFields={ingredientsFields}
            typesAppend={typesAppend}
            ingredientsAppend={ingredientsAppend}
            typesRemove={typesRemove}
            ingredientsRemove={ingredientsRemove}
            menuTypeOptions={state?.menuTypeOptions}
            subtitleOptions={state?.subtitleOptions}
          />
        </div>
      </section>
    </AdminLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const req = ctx.req;
  const session = await getSession({ req });
  if (!session) {
    // If no token is present redirect user to the login page
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  try {
    const user = await getUser(req);

    if (!user.isAdmin) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return {
      props: { cookies: req.headers.cookie },
    };
  } catch (error) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    ctx.res.writeHead(302, { Location: "/auth/login" });
    ctx.res.end();

    // `as never` prevents inference issues
    // with InferGetServerSidePropsType.
    // The props returned here don't matter because we've
    // already redirected the user.
    return { props: {} as never };
  }
};

export default AddMenuItem;
