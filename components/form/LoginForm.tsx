import React from "react";
import Messages from "../Messages";

const LoginForm = ({ register, handleSubmit, errors, submitHandler }) => {
  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
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
          id="email"
          placeholder="Email"
          aria-label="email-input"
          aria-errormessage="email-error"
          name="email"
          aria-invalid="true"
          {...register("email", {
            required: "This is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please enter a valid email address",
            },
          })}
        />
        {errors.email && (
          <Messages id="email-error" variant="danger">
            {errors.email.message}
          </Messages>
        )}
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
          id="password"
          name="password"
          placeholder="Password"
          aria-label="password-input"
          aria-errormessage="password-error"
          aria-invalid="true"
          {...register("password", {
            required: "This is required",
            minLength: {
              value: 7,
              message: "Please enter a password with at least 7 characters",
            },
            maxLength: {
              value: 15,
              message: "Please enter a password not more than 15 characters",
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{7,})/,
              message:
                "Password must contain at least one uppercase letter, one number and one special character",
            },
          })}
        />
        {errors.password && (
          <Messages id="password-error" variant="danger">
            {errors.password.message}
          </Messages>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 w-2/5 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
