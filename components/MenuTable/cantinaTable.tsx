import Image from "next/image";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useRouter } from "next/router";

function CantinaTable({ data }) {
  const router = useRouter();
  return (
    <div>
      {data?.menu?.map((item) => (
        <div
          key={item._id}
          className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 p-2 w-full sm:shadow-xl sm:rounded-2xl my-4"
        >
          <h1 className="text-xl font-mono ml-2 mb-2">{item.subtitle}</h1>
          <table className="w-full md:table">
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
                  Calice
                </th>
                <th
                  scope="col"
                  className="
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
                  Bottiglia
                </th>

                <th
                  scope="col"
                  className="relative px-3 py-3  text-center text-xs
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
              {item?.types?.map((item) => (
                <tr
                  key={item._id}
                  className="bg-white text-gray-900 max-w-fill  sm:w-full dark:text-gray-200 shadow-md md:shadow-none dark:bg-gray-900 rounded md:rounded-none overflow-hidden  mb-2 md:mb-0 md:border-none block md:table-row"
                >
                  <td className="p-2 flex items-center text-left whitespace-nowrap md:table-cell gap-2">
                    <span className="inline-block w-1/3 md:hidden font-bold dark:text-yellow-500 font-mono">
                      Name
                    </span>
                    <div className="flex items-center">
                      <div className="text-sm font-medium  overflow-hidden truncate text-clip text-justify">
                        {item.name}
                      </div>
                    </div>
                  </td>

                  <td className=" p-2 flex items-center text-left whitespace-nowrap  md:table-cell gap-2">
                    <span className="inline-block w-1/3 md:hidden dark:text-yellow-500 font-bold font-mono">
                      Name_English
                    </span>
                    <div className="text-sm truncate w-2/4">{item.Calice}</div>
                  </td>

                  <td className=" p-2 flex items-center text-left whitespace-nowrap  md:table-cell gap-2">
                    <span className="inline-block w-1/3 md:hidden dark:text-yellow-500 font-bold font-mono">
                      Price
                    </span>
                    <div className="text-sm  w-2/4">{item.Bottiglia}</div>
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
        </div>
      ))}
    </div>
  );
}

export default CantinaTable;
