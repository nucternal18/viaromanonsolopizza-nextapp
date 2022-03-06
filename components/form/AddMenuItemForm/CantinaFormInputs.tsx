import Button from "../../Button/GlobalButton";
import FormRowInput from "../FormRowInput";

export const CantinaFormInputs = ({
  fields,
  register,
  remove,
  append,
  errors,
}) => (
  <ul className="flex flex-col">
    {fields.map((field, index) => (
      <li
        key={field.id}
        className="grid grid-cols-1 md:grid-cols-4 gap-2 items-center w-full mt-2 sm:mt-0"
      >
        <div>
          <FormRowInput
            placeholder="Name"
            {...register(`types.${index}.name`)}
          />
          {errors && (
            <span id="name-error" className="text-gray-800 dark:text-red-500">
              {errors?.name?.message}
            </span>
          )}
        </div>
        <div>
          <FormRowInput
            placeholder="Bottiliga"
            {...register(`types.${index}.Bottiglia`)}
          />
        </div>
        <div>
          <FormRowInput
            placeholder="Calice"
            {...register(`types.${index}.Calice`)}
          />
        </div>
        <button
          type="button"
          onClick={() => remove(index)}
          className=" px-4 py-2 sm:mb-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
        >
          DELETE
        </button>
      </li>
    ))}
    <Button
      type="button"
      color="primary"
      className="mt-4 sm:mt-0"
      onClick={() => {
        append({
          name: "",
          Bottiglia: "",
          Calice: "",
        });
      }}
    >
      append
    </Button>
  </ul>
);
