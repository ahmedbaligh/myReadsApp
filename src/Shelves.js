import React, { Component } from 'react';
import Book from './Book';

class Shelfs extends Component {
  render() {
    const { books, shelfTitle, onShelfChange } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">
          {shelfTitle}
          {/* {books.length && <span className="bookshelf-count-label">{books.length}</span>} */}
        </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.length &&
              (books.map(book => (
                <Book
                  key={book.id}
                  book={book}
                  onShelfChange={onShelfChange}
                />
              )))
            }
          </ol>
        </div>
      </div>
    )
  }
}


export default Shelfs;
