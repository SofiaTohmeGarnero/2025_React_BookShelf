import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBook, postBook, putBook } from "../../services/books";
import styles from "./Form.module.css";

const Form = ({ id }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (id) {
      setLoading(true);
      getBook(id)
        .then((book) => {
          setValue("title", book.title);
          setValue("author", book.author);
          setValue("year", book.year);
          setValue("genre", book.genre);
        })
        .catch((e) => console.error(e))
        .finally(() => setLoading(false));
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      if (id) {
        await putBook(id, data);
        alert("Book updated successfully");
      } else {
        await postBook(data);
        alert("Book created successfully");
      }
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error saving book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
        <div>
          <div className={styles.box}>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 3,
                  message: "Title must be at least 3 characters",
                },
              })}
            />
          </div>
          {errors.title && (
            <p className={styles.error}>{errors.title.message}</p>
          )}
        </div>
        <div>
          <div className={styles.box}>
            <label htmlFor="author">Author</label>
            <input
              id="author"
              {...register("author", { required: "Author is required" })}
            />
          </div>
          {errors.author && (
            <p className={styles.error}>{errors.author.message}</p>
          )}
        </div>
        <div className={styles.yearAndGenre}>
          <div>
            <div className={styles.box}>
              <label htmlFor="year">Year</label>
              <input
                id="year"
                type="number"
                {...register("year", {
                  required: "Year is required",
                  min: {
                    value: 1000,
                    message: "Year must be greater than 1000",
                  },
                  max: {
                    value: 2100,
                    message: "Year cannot be greater than 2025",
                  },
                })}
              />
            </div>
            {errors.year && (
              <p className={styles.error}>{errors.year.message}</p>
            )}
          </div>
          <div>
            <div className={styles.box}>
              <label htmlFor="genre">Genre</label>
              <input
                id="genre"
                {...register("genre", { required: "Genre is required" })}
              />
            </div>
            {errors.genre && (
              <p className={styles.error}>{errors.genre.message}</p>
            )}
          </div>
        </div>
        <button type="submit" className={styles.submit}>
          {id ? "Update" : "Create"}
        </button>
      </form>
    </>
  );
};

export default Form;
