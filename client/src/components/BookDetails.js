import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getBookQuery, getBooksQuery, deleteBookMutation } from '../queries';

class BookDetails extends Component {
    constructor(props){
        super(props)
        this.deleteBook = this.deleteBook.bind(this)
    }
    deleteBook(){
        const { book } = this.props.data;
        this.props.deleteBookMutation({
            variables: {
                id: book.id
            },
            refetchQueries: [{ query: getBooksQuery }]
        })
    }
    displayBookDetails(){
        const { book } = this.props.data;
        if(book){
            return(
                <div>
                    <h2>{ book.name }</h2>
                    <p>Genre: { book.genre }</p>
                    <p>Author: { book.author.name }</p>
                    <p>All books by this author:</p>
                    <ul className="other-books">
                        { book.author.books.map(item => {
                            return <li key={item.id}>{ item.name }</li>
                        })}
                    </ul>
                    <button className="delete-btn" onClick={this.deleteBook}>Delete</button>
                </div>
            );
        } else {
            return( <div>No book selected...</div> );
        }
    }
    render(){
        return(
            <div id="book-details">
                { this.displayBookDetails() }
            </div>
        );
    }
}

export default compose(
    graphql(getBookQuery, {
        options: (props) => {
            return {
                variables: {
                    id: props.bookId
                }
            }
        }
    }, { name: "getBookQuery" }),
    graphql(deleteBookMutation, { name: "deleteBookMutation" })
)(BookDetails);


