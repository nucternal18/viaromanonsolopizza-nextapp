import React from "react";
import { FormRowSelect } from "..";
import { useMenu } from "../../context/menuContext";

const MenuFilterForm = ({ register, errors, reset }) => {
  const { state } = useMenu();
  return (
    <form>
      <div className="relative p-2  max-w-screen-xl  bg-white font-mono dark:bg-gray-900 shadow-xl mt-5 mx-2 md:mx-auto md:p-4">
        <h3 className="capitalize text-xl font-semibold  text-gray-900 dark:text-gray-200 mb-4">
          search form
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
          <FormRowSelect
            name="Menu Type"
            type="menuType"
            register={register}
            errors={errors.menuType}
            list={["all", ...state.menuTypeOptions]}
          />
          <FormRowSelect
            name="Sort"
            type="sort"
            register={register}
            errors={errors.sort}
            list={state.sortOptions}
          />

          <button
            className=" px-4 py-2 font-bold mt-4 text-white w-full bg-gray-500 rounded hover:bg-gray-700 focus:outline-none focus:shadow-outline  dark:text-gray-200 dark:hover:bg-gray-400"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              reset();
            }}
          >
            clear
          </button>
        </div>
      </div>
    </form>
  );
};

export default MenuFilterForm;
