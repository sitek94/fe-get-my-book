import * as React from "react";
import "./App.css";

type Book = {
  title: string;
  author: string;
  pages: number;
  tags: string[];
};
const dbId = "ff8e1c59e0124c9db5ac282b9a5c77fa";
function App() {
  const [input, setInput] = React.useState("");
  const [book, setBook] = React.useState<Book | null>(null);
  const [error, setError] = React.useState<Error>(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`http://localhost:5000/?url=${input}`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Something went wrong");
        }
        return res;
      })
      .then((res) => res.json())
      .then((json) => {
        setBook(json);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const createBook = () => {
    console.log(book);
    fetch("http://localhost:5000/book", {
      method: "POST",
      body: JSON.stringify(book),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(console.log)
      .catch(console.log);
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <input
            name="url"
            type="text"
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
          />
          <button type="submit">Send</button>
        </form>
        {error && <p>{error}</p>}
      </header>
      <main>
        {book && (
          <>
            <h2>Your book:</h2>
            <h3>Title: {book.title}</h3>
            <h3>Author: {book.author}</h3>
            <h3>Pages: {book.pages}</h3>
            <h3>Tags:</h3>
            <ul>
              {book.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </>
        )}
        <button onClick={createBook}>CREATE</button>
      </main>
    </div>
  );
}

export default App;
