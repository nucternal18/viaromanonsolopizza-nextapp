import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import AdminLayout from "../../../../components/layout/AdminLayout";
import { NEXT_URL } from "../../../../config";
import getUser from "../../../../lib/getUser";

function EditMenuItem() {
  return (
    <AdminLayout>
      <section className=" flex-grow w-full  mx-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 md:p-4">
        Edit Cantina menu item
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
  console.log(data);
  return {
    props: {},
  };
};

export default EditMenuItem;
