import { FaEdit, FaTrash } from "react-icons/fa";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { MenuItemProps } from "@lib/types";
interface TableProps {
  data: Partial<MenuItemProps[]>;
  handleDelete(id: string): void;
  menuType: string;
}

function CantinaTable({ data, handleDelete, menuType }: TableProps) {
  const router = useRouter();

  return (
    <div>
      {data?.map((cantinaItem) => (
        <div
          key={cantinaItem.id}
          className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 p-2 w-full shadow-xl rounded-2xl my-4"
        >
          <h1 className="text-xl font-mono ml-2 mb-2">
            {cantinaItem.subtitle}
          </h1>
          <div className="relative overflow-x-auto">
            <table className="w-full table">
              <thead className="bg-gray-50 dark:bg-yellow-500 table-header-group">
                <tr className="table-row top-auto gap-2 left-auto  relative">
                  {["Name", "Calice", "Bottiglia", "Actions"].map((item) => {
                    if (item === "Actions") {
                      return (
                        <th
                          key={`cantina-table-${item}`}
                          scope="col"
                          className="
                  py-3
                  text-center 
                  text-xs
                  font-medium
                  text-gray-800
                  dark:text-gray-100
                  uppercase
                  tracking-wider
                  table-cell
                "
                        >
                          {item}
                        </th>
                      );
                    } else {
                      return (
                        <th
                          key={`cantina-table-${item}`}
                          scope="col"
                          className="
                  py-3
                  text-left 
                  text-xs
                  font-medium
                  text-gray-800
                  dark:text-gray-100
                  uppercase
                  tracking-wider
                  table-cell
                "
                        >
                          {item}
                        </th>
                      );
                    }
                  })}
                </tr>
              </thead>
              <tbody className=" px-0  table-row-group">
                {cantinaItem?.types?.map((item) => (
                  <tr
                    key={item.id}
                    className="bg-white text-gray-900 max-w-fill  w-full dark:text-gray-200 shadow-none dark:bg-gray-900 rounded-none overflow-hidden mb-0 border-none table-row"
                  >
                    <td className="p-2  w-2/4 items-center text-left whitespace-nowrap table-cell gap-2">
                      <div className="flex items-center">
                        <div className="text-sm font-medium  overflow-hidden truncate text-clip text-justify">
                          {item.name}
                        </div>
                      </div>
                    </td>

                    <td className=" p- items-center text-left whitespace-nowrap  table-cell gap-2">
                      <div className="text-sm truncate w-2/4">
                        {item.Calice}
                      </div>
                    </td>

                    <td className=" p- items-center text-left whitespace-nowrap  table-cell gap-2">
                      <div className="text-sm pl-4 w-2/4">{item.Bottiglia}</div>
                    </td>

                    <td
                      className="
                   items-center
                  p-2
                    text-left 
                  whitespace-nowrap
                   text-sm
                  font-medium
                  table-cell
                  gap-2
                "
                    >
                      <div className="flex items-center md:justify-around">
                        <button
                          type="button"
                          className="text-blue-500 mr-4 md:mr-0"
                          onClick={() =>
                            router.push(
                              `/admin/menu/${cantinaItem.id}/${item.id}?type=Cantina`
                            )
                          }
                        >
                          <FaEdit fontSize={21} />
                        </button>
                        <button
                          type="button"
                          className="text-red-500"
                          onClick={() => handleDelete(cantinaItem.id)}
                        >
                          <FaTrash fontSize={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CantinaTable;
