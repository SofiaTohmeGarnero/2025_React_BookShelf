
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from "react-router-dom"
import styles from "./FormHeader.module.css"

const FormHeader = ({id}) => {
  return (
    <div className={styles.formHeader}>
      <h2 className={styles.title}>{id ? "Update book" : "Create new book" }</h2>
      <NavLink className={styles.button} to="/"> 
        <div>
          <FontAwesomeIcon icon={faArrowCircleLeft} />
        </div>
        <span>Back</span>
      </NavLink>
    </div>
  );
};

export default FormHeader;
