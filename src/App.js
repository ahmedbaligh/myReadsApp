import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import * as BooksAPI from './BooksAPI'
import Reads from './Reads'
import BookSearch from './BookSearch'

class BooksApp extends Component {
  state = {
    shelves: [
      {
        title: 'Currently Reading',
        name: 'currentlyReading'
      },
      {
        title: 'Want to Read',
        name: 'wantToRead'
      },
      {
        title: 'Read',
        name: 'read'
      }
    ],
    books: [],
    searchResults: []
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then(books => this.setState({ books }));
  }

  searchBooks = query => {
    if (!query) {
      this.setState({ searchResults: [] });
      return false;
    }

    BooksAPI.search(query)
    .then(res => {
      let results = [];
      if (res && res.length) {
        results = res.map(book => {
          // Map over results to compare with existing shelved books
          const [shelfBook] = this.state.books.filter(b => book.id === b.id);

          if (shelfBook) {
            book.shelf = shelfBook.shelf;
            return book;
          }

          book.shelf = 'none';
          return book;
        });
      }

      this.setState({ searchResults: results })
    });
  }

  clearResults = () => this.setState({ searchResults: [] });

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then(res => {
      let newBook = book;
      newBook.shelf = shelf;

      const newBooks = this.state.books.filter(b => b.id !== book.id);
      this.setState({ books: [...newBooks, newBook] });
    });
  }

  render() {
    const { books, searchResults, shelves } = this.state;

    return (
      <div className='app'>
        <Route exact path='/'>
          <Reads
            shelves={shelves}
            books={books}
            onShelfChange={this.changeShelf}
            onLoad={this.clearResults}
          />
        </Route>
        <Route path='/search'>
          <BookSearch
            books={searchResults}
            onSearch={this.searchBooks}
            onShelfChange={this.changeShelf}
          />
        </Route>
      </div>
    )
  }
}


export default BooksApp;
