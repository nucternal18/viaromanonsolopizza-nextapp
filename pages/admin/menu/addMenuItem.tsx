import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";

// components
import AdminLayout from "../../../components/layout/AdminLayout";

// context
import { useMenu } from "../../../context/menuContext";

// utils
import getUser from "../../../lib/getUser";

type TypesProps = {
  name: string;
  Bottiglia: string;
  Calice: string;
};

interface IFormData {
  name: string;
  name_english: string;
  ingredients: string;
  subtitle: string;
  price: string;
  types: TypesProps[];
  menuType: string;
  menuTypeOptions: string[];
}

function AddMenuItem() {
  const { state, addMenuItem } = useMenu();

  const {
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm<IFormData>();

  const onSubmit: SubmitHandler<Partial<IFormData>> = async (data) => {
    const menuDetails = {
      name: data.name,
      name_english: data.name_english,
      ingredients: data.ingredients,
      subtitle: data.subtitle,
      price: data.price,
      types: data.types,
      menuType: data.menuType,
    };
    addMenuItem(menuDetails);
  };

  return (
    <AdminLayout>
      <section className=" flex-grow w-full  mx-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 md:p-4">
        AddItem
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
