import { useEffect, useState } from "react";
import Modal from "../../components/modal/Modal";

import styles from "./header.module.css";

function Header() {
  const [boards, setBoards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("boards");
    if (data) {
      setBoards(JSON.parse(data)); 
    }
  }, []);

  function handleOpenBoardModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handleCreateBoard() {
    const newBoard = {
      id: Math.random().toString(36).substring(7),
      name: newBoardName 
    };

    setBoards(prevBoards => [...prevBoards, newBoard]);
    localStorage.setItem("boards", JSON.stringify([...boards, newBoard])); 
    setIsModalOpen(false);
  }

  return (
    <>
      <div className={styles.header}>
        <span className={styles.logo}>LOGO</span>
        <div className={styles.button}>
          <button onClick={handleOpenBoardModal}>Create New</button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={'Create New Hotel Board'}>
        <div className={styles.createBoardModal}>
          <input
            type="text"
            placeholder="Enter Board Name"
            value={newBoardName}
            onChange={(e) => setNewBoardName(e.target.value)}
          />
          <button onClick={handleCreateBoard}>Create Board</button>
        </div>
      </Modal>
    </>
  );
}

export default Header;
