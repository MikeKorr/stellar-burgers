import styles from "./Pages.module.css";

export function PageNotFound() {
  return (
    <div className={styles.mainbox}>
      <div>
        <p className="text text_type_digits-large">PAGE NOT FOUND</p>
      </div>
    </div>
  );
}
