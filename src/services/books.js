const BASE_URL = 'http://localhost:4000/books';

export const getBooks = async (page = 1, limit = 3) => {
  const response = await fetch(`${BASE_URL}?_page=${page}&_limit=${limit}`);
  if (!response.ok) {
    throw new Error('Error fetching books');
  }
  const data = await response.json();
  const totalCount = await response.headers.get("X-Total-Count");
  return {
    data,
    total: Number(totalCount)
  };
}

export const getBook = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) throw new Error(`Error fetching book with id: ${id}`);
  return response.json();
};

export const postBook = async (book) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book)
  });
  if (!response.ok) throw new Error("Error creating a new book");
  return response.json();
};

export const putBook = async (id, book) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book)
  });
  if (!response.ok) throw new Error("Error updating book");
  return response.json();
};

export const deleteBook = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
  if (!response.ok) {
    throw new Error(`Error deleting book with id: ${id}`);
  }
 return true;
}