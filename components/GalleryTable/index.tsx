/* eslint-disable react/jsx-key */
import {} from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import { useTable, usePagination } from "react-table";
import { FaTrash } from "react-icons/fa";
import { Timestamp } from "firebase/firestore";
import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/solid";
import { TableButton, PageButton } from "../Button/TableButtons";
import styles from "../../styles/Table.module.css";

type RowProps = {
  createdAt: Date;
  image: string;
  _id: string;
};

interface ITable {
  data: RowProps[];
  handleDelete: (id: string) => void;
}

const Table = ({ data, handleDelete }: ITable) => {
  return (
    <table className="w-full sm:shadow-xl sm:rounded-2xl  md:table">
      <thead className="bg-gray-50 dark:bg-red-500  hidden md:table-header-group">
        <tr className="md:table-row absolute  -top-full font-mono md:top-auto gap-2 -left-full md:left-auto  md:relative">
          <th
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
                  md:table-cell
                "
          >
            Image
          </th>

          <th
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
                  md:table-cell
                "
          >
            created at
          </th>

          <th
            scope="col"
            className="relative px-6 py-3  text-center 
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
        {data?.map((item) => (
          <tr
            key={item._id}
            className="bg-white text-gray-900 dark:text-gray-100 shadow-2xl md:shadow-none dark:bg-gray-700 rounded md:rounded-none overflow-hidden  mb-2 md:mb-0 md:border-none block md:table-row"
          >
            <td className="p-2 flex items-center text-left whitespace-nowrap md:table-cell gap-2">
              <span className="inline-block w-1/3 md:hidden font-bold dark:text-red-500 font-mono">
                Name
              </span>
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

            <td className="p-2 flex items-center text-left whitespace-nowrap md:table-cell gap-2">
              <span className="inline-block w-1/3 md:hidden uppercase font-bold dark:text-red-500 font-mono">
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
              <span className="inline-block w-1/3 md:hidden font-bold dark:text-red-500 font-mono">
                Action
              </span>
              <div className="flex items-center md:justify-around">
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => handleDelete(item._id)}
                >
                  <FaTrash fontSize={20} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  breakOn: PropTypes.oneOf(["small", "medium", "large"]),
};

export default Table;
