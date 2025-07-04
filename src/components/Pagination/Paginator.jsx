import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronCircleLeft, faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import styles from "./Paginator.module.css";

const Paginator = ({page, totalPages, setPage}) => {
  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
      >
        <FontAwesomeIcon icon={faChevronCircleLeft} />
      </button>
      <span className={styles.info}>
        Page {page} of {totalPages}
      </span>
      <button
        className={styles.button}
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={page === totalPages}
      >
        <FontAwesomeIcon icon={faChevronCircleRight} />
      </button>
    </div>
  );
};

export default Paginator;
