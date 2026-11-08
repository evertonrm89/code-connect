

import styles from "./search.module.css";

export const Search = () => {
  return (
    <div className={styles["search-container"]}>
        <form className={styles["search-form"]} action="/">
          <input name='q' className={styles["search-input"]} type="search" placeholder="Digite o que você procura..." />
          <button className={styles["search-button"]} type="submit">Buscar</button>
        </form>

    </div>
  );
}