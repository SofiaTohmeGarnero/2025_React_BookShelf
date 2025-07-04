import { useParams } from "react-router-dom";
import FormHeader from "../components/FormHeader/FormHeader";
import Form from "../components/Form/Form";

const BookForm = () => {
  const { id } = useParams();
  return (
    <div className="container">
      <FormHeader id={id} />
      <Form id={id} />
    </div>
  );
}

export default BookForm;