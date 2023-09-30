import { IngredientsDetails } from "../components/IngredientsDetails/IngredientsDetails";
import styles from "./Pages.module.css";

export function IngPage() {
  return (
    <div className={styles.mainbox}>
      <IngredientsDetails />
    </div>
  );
}
