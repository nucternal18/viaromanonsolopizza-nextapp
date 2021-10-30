import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

import Messages from "../../components/Messages";

//context
import { useAuth } from "../../context/authContext";
import Layout from "../../components/layout/Layout";

const Login = (props) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state, login } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);

    setEmail("");
    setPassword("");
  };

  if (state.isAuthenticated) {
    router.push("/admin");
  }

  return (
    <Layout title="Admin login">
      <section className="py-8">
        <div className="w-full mx-auto  max-w-lg">
          <h1 className="my-8 text-center text-3xl">
            Account <span className="text-blue-700">Login</span>
          </h1>
          <form
            onSubmit={onSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-base font-bold mb-2"
              >
                Email Address
              </label>
              <input
                className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-8">
              <label
                className="block text-gray-700 text-base font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {state.error && <Messages variant="danger">{state.error}</Messages>}
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 w-2/5 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
