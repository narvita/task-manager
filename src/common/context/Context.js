import React, { useState, useEffect } from "react";
import styles from "./context.module.css";
import Column from "../column/Column";

function Context() {
  const [columns, setColumns] = useState([]); 

  useEffect(() => {
    const savedColumns = localStorage.getItem("columns");
    if (savedColumns) {
      setColumns(JSON.parse(savedColumns));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("columns", JSON.stringify(columns));
  }, [columns]);

  function handleCreateColumn() {
    const savedColumns = JSON.parse(localStorage.getItem("columns")) || [];
    if (savedColumns.length === 0 && columns.length === 0) {
      const newColumn = {
        id: 1,
        title: `Column 1`,
        tickets: [],
      };
      setColumns([newColumn]);
    } else {
      const lastColumnId = savedColumns[savedColumns.length - 1]?.id || columns[columns.length - 1]?.id || 0;
      const newColumnId = lastColumnId + 1;
      const newColumn = {
        id: newColumnId,
        title: `Column ${newColumnId}`,
        tickets: [],
      };
      setColumns([...savedColumns, newColumn]);
    }
  }
  
  

  return (
    <div className={styles.context}>
      {!columns.length ? (
        <Column key={0} title={''} />
      ) : (
        <>
          {columns?.map((column) => (
            <Column key={column.id} title={column.title} />
          ))}
        </>
      )}

      <button className={styles.createbtn} onClick={handleCreateColumn}>
        Create Column
      </button>
    </div>
  );
}

export default Context;
