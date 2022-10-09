import { useCallback, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { toast } from "react-toastify";
import { Session } from "next-auth";
import { useRouter } from "next/router";

// components
import AdminLayout from "../../../components/layout/AdminLayout";
import { AddMenuItemForm } from "../../../components/form/AddMenuItemForm";

// redux
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { useAddMenuMutation } from "@features/menu/menuApiSlice";
import { menuSelector, setMenuType } from "@features/menu/menuSlice";

// utils
import { IFormData } from "../../../lib/types";

function AddMenuItem() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { menuType, menuTypeOptions, subtitleOptions } =
    useAppSelector(menuSelector);
  const [addMenu, { isLoading }] = useAddMenuMutation();

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
      dispatch(setMenuType(menuType));
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

  const onSubmit: SubmitHandler<Partial<IFormData>> = useCallback(
    async (data) => {
      const newIngredients = data?.ingredients?.map((ingredient) => {
        return ingredient["content"];
      });

      const menuDetails = {
        name: data?.name,
        name_english: data?.name_english || "",
        ingredients: newIngredients,
        subtitle: data?.subtitle || "",
        price: data?.price || "0,00",
        types: data?.types || [],
        type: data?.menuType,
      };

      try {
        const response = await addMenu(menuDetails).unwrap();
        if (response.success) {
          toast.success(
            response.message ?? "Voce di menu aggiunta correttamente",
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
          router.push("/admin/menu/addMenuItem");
          reset();
        }
      } catch (error: any) {
        toast.error(error.message ?? "Qualcosa è andato storto", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    },
    []
  );

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
            menuType={menuType}
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
            menuTypeOptions={menuTypeOptions}
            subtitleOptions={subtitleOptions}
            isLoading={isLoading}
          />
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
  try {
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
