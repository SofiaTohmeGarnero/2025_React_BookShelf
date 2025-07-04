import React, { useState, useEffect } from "react";
import { getBooks, deleteBook } from "../services/books";
import Card from "../components/Card/Card";
import GridHeader from "../components/gridHeader/gridHeader";
import Paginator from "../components/Pagination/Paginator";

const BookGrid = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 3;

  const fetchBooks = async () => {
      try {
        setLoading(true);
        const { data, total } = await getBooks(page, limit);
        setBooks(data);
        setTotalPages(Math.ceil(total / limit));
      } catch (err) {
        console.error(err);
        setError("Error loading books");
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
      
    //setTimeout(()=>{
      fetchBooks();
    //}, 1000)
  }, [page]);

  const handleDelete = async (id, title) => {
    const confirmed = window.confirm(`Are you sure you want to delete the book ${title}?`);
    if (!confirmed) return;
    try {
      //To delete for real 
       await deleteBook(id);
       fetchBooks();
      //For testing (It does not delete books from db)
      //setBooks(prev => prev.filter(book => book.id !== id));
    } catch (err) {
      console.error(err);
      alert(`Error deleting ${title}`);
    }
  };

  console.log(books);
  if (loading) return <p>Loading books...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="container">
      <GridHeader/>
      <ul style={{padding: "0"}}>{books && books.map((book)=>{
        return (
          <Card 
            title={book.title}
            author={book.author}
            genre={book.genre}
            year={book.year}
            id={book.id}
            handleDelete={()=>handleDelete(book.id, book.title)}
            key={`${book.title}-${book.id}`}
          />
        )
      })}
      </ul>
      <Paginator
        page ={page}
        setPage= {setPage}
        totalPages= {totalPages}
      />
    </div>
  );
};

export default BookGrid;
