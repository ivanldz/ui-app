import React from "react";
import styles from "./styles.module.css";

interface TableProps {
  title: string;
  colums: string[];
  data: string[][];
  page: number;
  setPage: Function;
  totalPages: number;
}

const Table: React.FC<TableProps> = ({
  title,
  colums,
  data,
  page,
  setPage,
  totalPages,
}) => {
  return (
    <div className={styles.table}>
      <h2>{title}</h2>
      <table>
        <thead>
          <tr>
            {colums.map((columna, index) => (
              <th key={index}>{columna}</th>
            ))}
          </tr>
        </thead>
        {data.length ? (
          <tbody>
            {data.map((fila, index) => (
              <tr key={index}>
                {fila.map((dato, index) => (
                  <td key={index}>{dato}</td>
                ))}
              </tr>
            ))}
          </tbody>
        ) : (
          <p>nothing to show</p>
        )}
      </table>
      {data.length ? (
        <div className={styles.navigation}>
          {page > 1 && <button onClick={() => setPage(page - 1)}>←</button>}
          {page != totalPages && (
            <button onClick={() => setPage(page + 1)}>→</button>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Table;
