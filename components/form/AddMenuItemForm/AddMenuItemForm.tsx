import {
  FieldArrayWithId,
  FieldError,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
} from "react-hook-form";
import { IFormData } from "../../../lib/types";

import FormRowSelect from "../FormRowSelect";
import { CantinaFormInputs } from "./CantinaFormInputs";
import { FormInputs } from "./FormInputs";

type ErrorProps = {
  name?: FieldError;
  Bottiglia?: FieldError;
  Calice?: FieldError;
  name_english?: FieldError;
  ingredients?: { content?: FieldError }[];
  price?: FieldError;
  menuType?: FieldError;
};

interface IFormProps {
  onSubmit: (data: IFormData) => void;
  menuType: string;
  handleSubmit: UseFormHandleSubmit<Partial<IFormData>>;
  reset: UseFormReset<IFormData>;
  register: UseFormRegister<Partial<IFormData>>;
  errors: ErrorProps;
  ingredientsFields?: FieldArrayWithId<
    Partial<IFormData>,
    "ingredients",
    "id"
  >[];
  ingredientsRemove?: UseFieldArrayRemove;
  ingredientsAppend?: UseFieldArrayAppend<Partial<IFormData>, "ingredients">;
  typesField?: FieldArrayWithId<Partial<IFormData>, "types", "id">[];
  typesRemove?: UseFieldArrayRemove;
  typesAppend?: UseFieldArrayAppend<Partial<IFormData>, "types">;
  menuTypeOptions: string[];
  subtitleOptions: string[];
}

const AddMenuItemForm = ({
  register,
  errors,
  reset,
  handleSubmit,
  onSubmit,
  menuType,
  typesAppend,
  typesRemove,
  ingredientsAppend,
  ingredientsRemove,
  ingredientsFields,
  typesField,
  menuTypeOptions,
  subtitleOptions,
}: IFormProps) => {
  console.log(menuType);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative p-2  max-w-screen-xl  bg-white font-mono dark:bg-gray-900 shadow-xl mt-5 mx-2 md:mx-auto md:p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center my-4">
          <FormRowSelect
            label="Menu Type"
            list={menuTypeOptions}
            {...register("menuType")}
          />
          <FormRowSelect
            label="Cantina Subtitle"
            list={subtitleOptions}
            {...register("subtitle")}
          />
        </div>

        <CantinaFormInputs
          register={register}
          errors={errors}
          fields={typesField}
          remove={typesRemove}
          append={typesAppend}
        />

        <FormInputs
          register={register}
          errors={errors}
          fields={ingredientsFields}
          remove={ingredientsRemove}
          append={ingredientsAppend}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            className=" px-4 py-2 font-bold mt-4 text-white w-full bg-rose-500 rounded hover:bg-rose-700 focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
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

export default AddMenuItemForm;
