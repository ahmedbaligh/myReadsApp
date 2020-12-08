import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';

class BookSearch extends Component {

  state = {
    query: ''
  }

  handleSearch = query => {
    this.setState({ query });
    this.props.onSearch(query.trim());
  }

  clearQuery = () => this.updateQuery('');

  render() {

    const { query } = this.state;
    const { books, onShelfChange } = this.props;

    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link
            className='close-search'
            to='/'
          >
            Close
          </Link>
          
          <div className='search-books-input-wrapper'>
            <input 
              id='search-input'
              type='text'
              placeholder='Search by title or author'
              autoFocus
              value={query}
              onChange={evt => this.handleSearch(evt.target.value)}
            />
          </div>
        </div>

        <div className='search-books-results'>
          {books.length > 0 && (
            <div className='search-books-results-count'>
              Found {books.length} Results
            </div>
          )}
          <ol className='books-grid'>
            {books.length ?
              (books.map(book => (
                <Book
                  key={book.id}
                  book={book}
                  onShelfChange={onShelfChange}
                />
              )))
              :
              <div>No Results Found</div>
            }
          </ol>
        </div>
      </div>
    )
  }
}


export default BookSearch;
