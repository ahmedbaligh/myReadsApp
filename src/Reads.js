import React, { Component } from 'react';
import Shelves from './Shelves';

class Reads extends Component {
  render() {
    const { shelves, books } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelves.map(shelf => (
              <Shelves
                key={shelf.name}
                shelfTitle={shelf.title}
                books={books.filter(book => book.shelf === shelf.name)}
                onShelfChange={this.props.onShelfChange}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}


export default Reads;
