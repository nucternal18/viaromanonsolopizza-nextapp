import PropTypes from "prop-types";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { Timestamp } from "firebase/firestore";
import styles from "../../styles/Table.module.css";

type RowProps = {
  createdAt: Timestamp;
  url: string;
  id: string;
};

interface ITable {
  tableData: RowProps[];
  headingColumns: string[];
  deleteHandler: (id: string) => void;
}

const Table = ({ tableData, headingColumns, deleteHandler }: ITable) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.tableContainerTable}>
        <thead>
          <tr>
            {headingColumns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => {
            return (
              <tr key={row.id}>
                <td data-heading={"id"}>{row.id}</td>
                <td data-heading={"image"}>
                  <Image
                    src={row.url}
                    alt={""}
                    width={70}
                    height={70}
                    className="rounded-lg"
                  />
                </td>
                <td data-heading={"name"}>
                  {new Date(row.createdAt.toDate()).toDateString()}
                </td>
                <td data-heading={"action"}>
                  <button
                    className="text-red-600 text-md"
                    onClick={() => deleteHandler(row.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  headingColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  breakOn: PropTypes.oneOf(["small", "medium", "large"]),
};

export default Table;
