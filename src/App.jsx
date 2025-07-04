import { Routes, Route } from "react-router-dom";
import BookGrid from "./pages/BookGrid";
import BookForm from "./pages/BookForm";
import Header from "./components/Header/Header";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<BookGrid />} />
        <Route path="/book" element={<BookForm />} />
        <Route path="/book/:id" element={<BookForm />} />
      </Routes>
    </div>
  );
}

export default App;
