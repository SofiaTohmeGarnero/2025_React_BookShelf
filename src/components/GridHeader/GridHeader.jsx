
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from "react-router-dom"
import styles from "./GridHeader.module.css"

const GridHeader = () => {
  return (
    <div className={styles.gridHeader}>
      <h2 className={styles.title}>Book Catalog</h2>
      <NavLink className={styles.button} to="/book"> 
        <span>Add book</span>
        <div>
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </NavLink>
    </div>
  );
};

export default GridHeader;
