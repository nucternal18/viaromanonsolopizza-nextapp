/* eslint-disable react/jsx-key */
import { useMemo } from "react";
import PropTypes from "prop-types";
import {
  useTable,
  usePagination,
  useFilters,
  useGroupBy,
  useExpanded,
} from "react-table";
import { FaTrash } from "react-icons/fa";
import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/solid";

import styles from "../../styles/Table.module.css";
import { TableButton, PageButton } from "../Button/TableButtons";

interface IFormData {
  search: string;
  company: string;
  sort: string;
  sortOptions: string[];
  jobType: string;
  jobTypeOptions: string[];
  status: string;
  statusOptions: string[];
}

interface ITable {
  data: any[];
  columns: any[];
  deleteHandler?: (id: string) => void;
}

// This is a custom filter UI for selecting
// a unique option from a list
// export function SelectColumnFilter({
//   column: { filterValue, setFilter, preFilteredRows, id, render },
// }) {
//   console.log(preFilteredRows);
//   console.log(id);
//   // Calculate the options for filtering
//   // using the preFilteredRows
//   const options = useMemo(() => {
//     const options = new Set();

//     // preFilteredRows.forEach((row) => {
//     //   options.add(row.values[id]);
//     // });
//     // return [...options.values()];
//   }, [id, preFilteredRows]);

//   // Render a multi-select box
//   return (
//     <label className="flex gap-x-2 items-baseline">
//       <span className="text-gray-700">{render("Header")}: </span>
//       <select
//         className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//         name={id}
//         id={id}
//         value={filterValue}
//         onChange={(e) => {
//           setFilter(e.target.value || undefined);
//         }}
//       >
//         <option value="">All</option>
//         {options?.map((option, i) => (
//           <option key={i} value={option}>
//             {option}
//           </option>
//         ))}
//       </select>
//     </label>
//   );
// }

export function TimeCell({ value }) {
  return (
    <div>
      <p>{new Date(value.toDate()).toDateString()}</p>
    </div>
  );
}

export function ActionsCell({ value, deleteHandler }) {
  return (
    <div>
      <button
        className="text-red-600 text-md"
        onClick={() => deleteHandler(value)}
      >
        <FaTrash />
      </button>
    </div>
  );
}

const Table = ({ data, columns }: ITable) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable({ columns, data }, useGroupBy, useExpanded, usePagination);

  return (
    <>
      {/* Filter */}
      {/* <div className="sm:flex sm:gap-x-2">
        {headerGroups.map((headerGroup) =>
          headerGroup.headers.map((column) =>
            column.Filter ? (
              <div className="mt-2 sm:mt-0" key={column.id}>
                {column.render("Filter")}
              </div>
            ) : null
          )
        )}
      </div> */}
      {/* Table */}
      <div className={styles.tableContainer}>
        <table {...getTableProps()} className={styles.tableContainerTable}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              console.log(row);
              return (
                <tr key={row.id} {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()} role="cell">
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="py-3 flex items-center justify-between">
        <div className="flex-1 flex justify-between sm:hidden">
          <TableButton
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            Previous
          </TableButton>
          <TableButton onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </TableButton>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div className="flex gap-x-2 items-baseline">
            <span className="text-sm text-gray-700">
              Page <span className="font-medium">{state.pageIndex + 1}</span> of{" "}
              <span className="font-medium">{pageOptions.length}</span>
            </span>
            <label>
              <span className="sr-only">Items Per Page</span>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={state.pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[5, 10, 20].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <PageButton
                className="rounded-l-md"
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                <span className="sr-only">First</span>
                <ChevronDoubleLeftIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </PageButton>
              <PageButton
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </PageButton>
              <PageButton onClick={() => nextPage()} disabled={!canNextPage}>
                <span className="sr-only">Next</span>
                <ChevronRightIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </PageButton>
              <PageButton
                className="rounded-r-md"
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                <span className="sr-only">Last</span>
                <ChevronDoubleRightIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </PageButton>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

Table.propTypes = {
  breakOn: PropTypes.oneOf(["small", "medium", "large"]),
};

export default Table;
