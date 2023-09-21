import { Header } from "./Header/Header";
import styles from "./AppHeader.module.css";

export default function AppHeader() {
  return (
    <header className={styles.position}>
      <Header />
    </header>
  );
}
