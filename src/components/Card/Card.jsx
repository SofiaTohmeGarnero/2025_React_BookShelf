import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import styles from "./Card.module.css";

const Card = ({ title, author, genre, year, id, handleDelete }) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.book}>
          <FontAwesomeIcon icon={faBook} />
        </div>
        <div className={styles.info}>
          <h4>{title}</h4>
          <span className={styles.bold}>Author: </span>
          <span>{author}</span>
          <div>
            <div>
              <span className={styles.bold}>Published: </span>
              <span>{year}</span>
            </div>
            <div>
              <span className={styles.bold}>Genre: </span>
              <span>{genre}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.icons}>
        <NavLink className={styles.action} to={`/book/${id}`}>
          <FontAwesomeIcon icon={faPen} />
        </NavLink>
        <div className={styles.action} role="button" onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrash} />
        </div>
      </div>
    </div>
  );
};

export default Card;
