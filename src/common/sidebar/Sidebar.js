import { useState, useEffect } from "react";
import styles from "./sidebar.module.css";

function Sidebar() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const storedBoards = JSON.parse(localStorage.getItem("boards"));
    if (storedBoards) {
      setBoards(storedBoards);
    }
  }, []);

  return (
    <div className={styles.sidebar}>
      <span className={styles.logo}>Boards</span>
      <div className={styles.boardList}>
        {boards.map((board) => (
          <button key={board.id} className={styles.boardButton}>
            {board.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
