import { FaEdit, FaTrash } from "react-icons/fa";
import { useRouter } from "next/router";

function Table({ data }) {
  const router = useRouter();

  return (
    <table className="w-full sm:shadow-xl sm:rounded-2xl  md:table">
      <thead className="bg-gray-50 dark:bg-yellow-500  hidden md:table-header-group">
        <tr className="md:table-row absolute  -top-full md:top-auto gap-2 -left-full md:left-auto  md:relative">
          <th
            scope="col"
            className="
                  px-3
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-800
                  dark:text-gray-100
                  uppercase
                  tracking-wider
                  md:table-cell
                "
          >
            Name
          </th>
          <th
            scope="col"
            className="
                  px-3
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-800
                  dark:text-gray-100
                  uppercase
                  tracking-wider
                  md:table-cell
                "
          >
            Name_English
          </th>
          <th
            scope="col"
            className="
                  px-3
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-800
                  dark:text-gray-100
                  uppercase
                  tracking-wider
                  md:table-cell
                "
          >
            Price
          </th>
          <th
            scope="col"
            className="
                  px-3
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-800
                  dark:text-gray-100
                  uppercase
                  tracking-wider
                  md:table-cell
                "
          >
            created at
          </th>

          <th
            scope="col"
            className="relative px-6 py-3  text-left text-xs
                  font-medium
                  text-gray-800
                  dark:text-gray-100
                  uppercase
                  tracking-wider md:table-cell"
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody className=" block px-1 md:px-0  md:table-row-group">
        {data?.menu?.map((item) => (
          <tr
            key={item._id}
            className="bg-white text-gray-900 dark:text-gray-100 shadow-2xl md:shadow-none dark:bg-gray-700 rounded md:rounded-none overflow-hidden  mb-2 md:mb-0 md:border-none block md:table-row"
          >
            <td className="p-2 flex items-center text-left whitespace-nowrap md:table-cell gap-2">
              <span className="inline-block w-1/3 md:hidden font-bold dark:text-yellow-500 font-mono">
                Name
              </span>
              <div className="flex items-center">
                <div className="text-sm font-medium text-ellipsis overflow-hidden">
                  {item.name}
                </div>
              </div>
            </td>

            <td className=" p-2 flex items-center text-left whitespace-nowrap  md:table-cell gap-2">
              <span className="inline-block w-1/3 md:hidden dark:text-yellow-500 font-bold font-mono">
                Name_English
              </span>
              <div className="text-sm truncate w-2/4">{item.name_english}</div>
            </td>

            <td className=" p-2 flex items-center text-left whitespace-nowrap  md:table-cell gap-2">
              <span className="inline-block w-1/3 md:hidden dark:text-yellow-500 font-bold font-mono">
                Price
              </span>
              <div className="text-sm  w-2/4">{item.price}</div>
            </td>

            <td className="p-2 flex items-center text-left whitespace-nowrap md:table-cell gap-2">
              <span className="inline-block w-1/3 md:hidden uppercase font-bold dark:text-yellow-500 font-mono">
                created at
              </span>
              <span
                className="
                    px-2
                    inline-flex
                    text-xs
                    leading-5
                    font-semibold
                    rounded-full
                    bg-green-100
                    text-green-800
                  "
              >
                {new Date(item.createdAt).toDateString()}
              </span>
            </td>

            <td
              className="
                      flex items-center
                  p-2
                    text-left 
                  whitespace-nowrap
                   text-sm
                  font-medium
                  md:table-cell
                  gap-2
                "
            >
              <span className="inline-block w-1/3 md:hidden font-bold dark:text-yellow-500 font-mono">
                Action
              </span>
              <div className="flex items-center md:justify-around">
                <button
                  type="button"
                  className="text-blue-500 mr-4 md:mr-0"
                  onClick={() => router.push(`/admin/menu/${item._id}`)}
                >
                  <FaEdit fontSize={21} />
                </button>
                <button type="button" className="text-red-500">
                  <FaTrash fontSize={20} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
