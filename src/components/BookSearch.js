import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BookSearch.css';

const BookSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query.length > 2) {
      fetch(`https://openlibrary.org/search.json?q=${query}&limit=10&page=1`)
        .then(response => response.json())
        .then(data => setResults(data.docs));
    }
  }, [query]);

  const addToBookshelf = (book) => {
    const bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    localStorage.setItem('bookshelf', JSON.stringify([...bookshelf, book]));
  };

  return (
    <div className='cols'>
    <div className="book-search">
      <h2>Search by book name:</h2>
      <input
        type="text"
        placeholder="Search for books"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="search-results">
        {results.map((book) => (
          <div className="book-card" key={book.key}>
            <h3><b>Title:</b> {book.title}</h3>
            <p>{book.author_name ? book.author_name.join(', ') : 'Unknown Author'}</p>
            <button onClick={() => addToBookshelf(book)}>Add to Bookshelf</button>
          </div>
        ))}
      </div>
      
    </div>
    <div className='mybs'>
    <button><Link to="/bookshelf" className='btn'>Go to My Bookshelf</Link></button>
    </div>
    </div>
  );
};

export default BookSearch;
