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

function Table({ data, menuType, handleDelete }: TableProps) {
  const router = useRouter();

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full shadow-xl rounded-2xl table">
        <thead className="bg-gray-50 dark:bg-red-500  table-header-group">
          <tr className="md:table-row top-auto gap-2 left-auto  relative">
            {["Nome", "Nome Inglese", "Prezzo", "Creato a", "Azioni"].map(
              (item) => {
                if (item === "Azioni") {
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
                  pl-2
                  text-left 
                  text-xs
                  font-medium
                  text-gray-800
                  dark:text-gray-100
                  uppercase
                  tracking-wider
                  table-cell
                  whitespace-nowrap
                "
                    >
                      {item}
                    </th>
                  );
                }
              }
            )}
          </tr>
        </thead>
        <tbody className="px-0  table-row-group">
          {data?.map((item) => (
            <tr
              key={item.id}
              className="bg-white text-gray-900 dark:text-gray-100 shadow-none dark:bg-gray-700 rounded-none overflow-hidden  mb-0 border-none table-row"
            >
              <td className="p-2  items-center text-left whitespace-nowrap table-cell gap-2">
                <div className="flex items-center">
                  <div className="text-sm font-medium text-ellipsis overflow-hidden">
                    {item.name}
                  </div>
                </div>
              </td>

              <td className=" p-2 items-center text-left whitespace-nowrap  table-cell gap-2">
                <div className="text-sm truncate w-2/4">
                  {item.name_english}
                </div>
              </td>

              <td className=" p-2 items-center text-left whitespace-nowrap  table-cell gap-2">
                <div className="text-sm  w-2/4">{item.price}</div>
              </td>

              <td className="p-2 items-center text-left whitespace-nowrap table-cell gap-2">
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
                <div className="flex items-center justify-around">
                  <button
                    type="button"
                    className="text-blue-500 mr-4 md:mr-0"
                    onClick={() =>
                      router.push(`/admin/menu/${item.id}?type=${menuType}`)
                    }
                  >
                    <FaEdit fontSize={21} />
                  </button>
                  <button
                    type="button"
                    className="text-red-500"
                    onClick={() => handleDelete(item.id)}
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
  );
}

export default Table;
