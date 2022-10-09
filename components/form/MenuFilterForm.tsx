import React from "react";
import { FormRowSelect } from "..";

import { useAppDispatch, useAppSelector } from "@app/hooks";
import { setMenuType, setSort, menuSelector } from "@features/menu/menuSlice";

const MenuFilterForm = ({ register, errors, reset }) => {
  const dispatch = useAppDispatch();
  const { menuTypeOptions, sortOptions } = useAppSelector(menuSelector);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSort(e.target.value));
  };
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setMenuType(e.target.value));
  };
  return (
    <form>
      <div className="relative p-2  max-w-screen-xl font-mono shadow-xl py-5 mx-2 md:mx-auto md:p-4">
        <h3 className="capitalize text-xl font-semibold  text-gray-900 dark:text-gray-200 mb-4">
          search form
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
          <FormRowSelect
            label="Menu Type"
            list={menuTypeOptions}
            {...register("menuType", { onChange: handleTypeChange })}
          />
          <FormRowSelect
            label="Sort"
            list={sortOptions}
            {...register("sort", { onChange: handleSortChange })}
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
