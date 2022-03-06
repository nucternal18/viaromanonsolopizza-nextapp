import Button from "../../Button/GlobalButton";
import FormRowInput from "../FormRowInput";

export const FormInputs = ({ fields, register, remove, append, errors }) => (
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
        <span id="name-error" className="text-gray-800 dark:text-red-500">
          {errors?.name?.message}
        </span>
      )}
    </div>
    <div>
      <FormRowInput label="Name English" {...register("name_english")} />
    </div>
    <div>
      <FormRowInput
        label="Price"
        {...register("price", {
          required: true,
        })}
      />
      {errors && (
        <span id="price-error" className="text-gray-800 dark:text-red-500">
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
            <FormRowInput {...register(`ingredients.${index}`)} />
            <button
              type="button"
              onClick={() => remove(index)}
              className=" px-4 py-2 font-bold sm:mb-2 text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
            >
              DELETE
            </button>
          </li>
        ))}
      <Button
        type="button"
        color="primary"
        onClick={() => {
          append("New value");
        }}
      >
        append
      </Button>
    </ul>
  </div>
);
