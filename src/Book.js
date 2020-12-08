import React, { Component } from 'react';


class Book extends Component {
  handleChange = evt => {
      this.props.onShelfChange && this.props.onShelfChange(this.props.book, evt.target.value);
  }

  render() {
    const book = this.props.book;
    return (
      <li>
        <div className='book'>
          <div className='book-top'>
            <div
              className='book-cover'
              style={{ backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})` }}
            >
            </div>
            
            <div className='book-shelf-changer'>
              <select
                value={book.shelf || ''}
                onChange={this.handleChange}
              >
                <option value='' disabled>Move to...</option>
                <option value='currentlyReading'>Currently Reading</option>
                <option value='wantToRead'>Want to Read</option>
                <option value='read'>Read</option>
                <option value='none'>None</option>
              </select>
            </div>
          </div>
          <div className='book-title'>
            {book.title || 'No title found'}
          </div>
          <div>
            {book.authors && book.authors.map((author, i) => (
              <div key={i} className='book-authors'>
                {author}
              </div>
            ))}
          </div>
        </div>
      </li>
    )
  }
}

export default Book;
