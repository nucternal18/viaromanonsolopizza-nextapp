import FormRowSelect from "./FormRowSelect";

const GalleryFilterForm = ({ register, sortOptions }) => {
  return (
    <form>
      <div className="relative p-2  max-w-screen-xl  bg-white font-mono dark:bg-gray-900 shadow-xl py-5 mx-2 md:mx-auto md:p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
          <FormRowSelect
            label="Sort"
            list={sortOptions}
            {...register("sort")}
          />
        </div>
      </div>
    </form>
  );
};

export default GalleryFilterForm;
