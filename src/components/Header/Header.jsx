import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import styles from "./Header.module.css"

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>Book Shelf</h1>
      <div className={styles.user}>
        <h3>Sofia Tohme</h3>
        <div className={styles.circle}>
          <FontAwesomeIcon icon={faUser} />
        </div>
      </div>
    </header>
  );
};

export default Header;
