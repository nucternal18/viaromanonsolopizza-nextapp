/* eslint-disable react/jsx-key */
import PropTypes from "prop-types";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";

type RowProps = {
  createdAt: Date;
  image: string;
  id: string;
};

interface ITable {
  data: RowProps[];
  handleDelete: (id: string) => void;
}

const Table = ({ data, handleDelete }: ITable) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full sm:shadow-xl sm:rounded-2xl  table">
        <thead className="bg-gray-50 dark:bg-red-500 table-header-group">
          <tr className="table-row font-mono top-auto gap-2  left-auto  relative">
            {["Image", "Creato a", "Azione"].map((header) => {
              return (
                <th
                  key={`image-table-${header}`}
                  scope="col"
                  className="
                  px-3
                  py-3
                  text-left 
                  font-medium
                  text-gray-800
                  dark:text-gray-100
                  uppercase
                  tracking-wider
                  table-cell
                "
                >
                  {header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className=" px-0 table-row-group">
          {data?.map((item) => (
            <tr
              key={item.id}
              className="bg-white text-gray-900 dark:text-gray-100 shadow-none dark:bg-gray-700 rounded-none overflow-hidden mb-0 border-none table-row"
            >
              <td className="p-2 items-center text-left whitespace-nowrap table-cell gap-2">
                <div className="flex items-center">
                  <div className="text-sm font-medium text-ellipsis overflow-hidden">
                    <div>
                      <Image
                        src={item?.image}
                        alt={""}
                        width={70}
                        height={70}
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                </div>
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

              <td className="items-center p-2 text-center whitespace-nowrap text-sm font-medium table-cell gap-2">
                <div className="flex items-center md:justify-around">
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
};

Table.propTypes = {
  breakOn: PropTypes.oneOf(["small", "medium", "large"]),
};

export default Table;
