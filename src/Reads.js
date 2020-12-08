import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Shelves from './Shelves';

class Reads extends Component {
  componentDidMount() {
    this.props.onLoad && this.props.onLoad();
  }

  render() {
    const { shelves, books, onShelfChange } = this.props;

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
                onShelfChange={onShelfChange}
              />
            ))}
          </div>
        </div>
        <div className='open-search'>
          <Link to='/search'>
            <button>Add a Book</button>
          </Link>
        </div>
      </div>
    )
  }
}


export default Reads;
