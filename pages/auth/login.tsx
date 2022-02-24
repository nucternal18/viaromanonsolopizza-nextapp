import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { signIn, getSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

import Layout from "../../components/layout/Layout";
import LoginForm from "../../components/form/LoginForm";

//context
import { ActionType, useAuth } from "../../context/authContext";

type IFormInputs = {
  email: string;
  password: string;
};

const Login = (props) => {
  const router = useRouter();

  const { state, dispatch } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>();

  const submitHandler: SubmitHandler<IFormInputs> = async (data) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    if (result.error) {
      toast.error("Invalid email or password");
    }
    if (result.ok) {
      const session = await getSession();

      dispatch({
        type: ActionType.FETCH_USER_SUCCESS,
        payload: session.user,
      });
      router.push("/admin");
    }
  };

  return (
    <Layout title="Admin login">
      <section className="py-8">
        <div className="w-full mx-auto  max-w-lg">
          <h1 className="my-8 text-center text-3xl">
            Account <span className="text-blue-700">Login</span>
          </h1>
          <LoginForm
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            submitHandler={submitHandler}
          />
        </div>
      </section>
    </Layout>
  );
};

export default Login;
