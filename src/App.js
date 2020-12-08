import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import * as BooksAPI from './BooksAPI'
import BookSearch from './BookSearch'

class BooksApp extends Component {
  state = {
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
          const shelfBook = this.state.books.filter(b => book.id === b.id);

          if (shelfBook) {
            book.shelf = shelfBook.shelf;
            return book;
          }

          book.shelf = undefined;
          return book;
        });
      }

      this.setState({ searchResults: results })
    });
  }

  render() {
    // console.log(this.state);

    const { searchResults } = this.state;

    return (
      <div className='app'>
        <Route path='/search' render={() => (
          <BookSearch
            books={searchResults}
            onSearch={this.searchBooks}
            onShelfChange={this.changeShelf}
          />
        )} />
      </div>
    )
  }
}


export default BooksApp;
