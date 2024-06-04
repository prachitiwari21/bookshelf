import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Bookshelf.css';

const Bookshelf = () => {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setBookshelf(storedBookshelf);
  }, []);

  return (
    <div className="bookshelf">
      <h2>My Bookshelf</h2>
      <div className="bookshelf-list">
        {bookshelf.map((book, index) => (
          <div className="book-card" key={index}>
            <h3>Book title:</h3> <h4>{book.title}</h4>
       
            <p>{book.author_name && book.author_name.join(', ')}</p>
          </div>
        ))}
      </div>
      <button><Link to="/" className='btn'>Back to Search</Link></button>
    </div>
  );
};

export default Bookshelf;
