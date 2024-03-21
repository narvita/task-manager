import Card from "../../components/card/Card";

import styles from "./column.module.css";

function Column() {
  return (
    <div className={styles.content}>
      <h2>Create Ticket</h2>
      <Card card={[]} />
    </div>
  );
}

export default Column;
