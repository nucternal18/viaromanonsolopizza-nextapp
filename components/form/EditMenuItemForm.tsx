import {
  FieldError,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
} from "react-hook-form";
import { IFormData } from "../../lib/types";
import Button from "../Button/GlobalButton";
import FormRowInput from "./FormRowInput";

type ErrorProps = {
  name?: FieldError;
  Bottiglia?: FieldError;
  Calice?: FieldError;
  name_english?: FieldError;
  ingredients?: {
    content?: FieldError;
  }[];
  price?: FieldError;
  menuType?: FieldError;
};

interface IFormProps {
  onSubmit: (data: IFormData) => void;
  menuType: string;
  handleSubmit: UseFormHandleSubmit<IFormData>;
  reset: UseFormReset<IFormData>;
  register: UseFormRegister<IFormData>;
  errors: ErrorProps;
  fields?: Record<"id", string>[];
  remove?: UseFieldArrayRemove;
  append?: UseFieldArrayAppend<IFormData, never>;
}

const EditMenuItemForm = ({
  register,
  errors,
  reset,
  handleSubmit,
  onSubmit,
  menuType,
  fields,
  remove,
  append,
}: IFormProps) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative p-2  max-w-screen-xl  bg-white font-mono dark:bg-gray-900 shadow-xl mt-5 mx-2 md:mx-auto md:p-4">
        {menuType === "Cantina" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center w-full">
            <div>
              <FormRowInput
                label="Name"
                {...register("name", {
                  required: true,
                  pattern: {
                    value: /^[A-Za-z\s, -]+$/,
                    message: "Please enter a valid name",
                  },
                })}
              />
              {errors && (
                <span
                  id="name-error"
                  className="text-gray-800 dark:text-red-500"
                >
                  {errors?.name?.message}
                </span>
              )}
            </div>
            <div>
              <FormRowInput label="Bottiliga" {...register("Bottiglia")} />
            </div>
            <div>
              <FormRowInput label="Calice" {...register("Calice")} />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center w-full">
            <div>
              <FormRowInput
                label="Name"
                {...register("name", {
                  required: true,
                  pattern: {
                    value: /^[A-Za-z\s, -]+$/,
                    message: "Please enter a valid name",
                  },
                })}
              />
              {errors && (
                <span
                  id="name-error"
                  className="text-gray-800 dark:text-red-500"
                >
                  {errors?.name?.message}
                </span>
              )}
            </div>
            <div>
              <FormRowInput
                label="Name English"
                {...register("name_english")}
              />
            </div>
            <div>
              <FormRowInput
                label="Price"
                {...register("price", {
                  required: true,
                })}
              />
              {errors && (
                <span
                  id="price-error"
                  className="text-gray-800 dark:text-red-500"
                >
                  {errors?.price}
                </span>
              )}
            </div>
            <ul className="flex flex-col">
              <h3>Ingredients</h3>
              {fields &&
                fields.map((field, index) => (
                  <li
                    key={field.id}
                    className="flex flex-row items-center gap-2 sm:gap-4"
                  >
                    <FormRowInput
                      placeholder="Ingredient"
                      {...register(`ingredients.${index}.content`)}
                    />
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className=" px-4 py-2 font-bold mb-2 text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
                    >
                      DELETE
                    </button>
                  </li>
                ))}
              <Button
                type="button"
                color="primary"
                onClick={() => {
                  append("");
                }}
              >
                append
              </Button>
            </ul>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            className=" px-4 py-2 font-bold mt-4 text-white w-full bg-rose-500 rounded hover:bg-rose-700 focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update
          </button>
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

export default EditMenuItemForm;
