const { useState } = React
const { NavLink } = ReactRouterDOM

import { bookService } from '../services/book.service.js'
import { BookDetails } from './BookDetails.jsx'
import { BookPreview } from './BookPreview.jsx'

export function BookList({ books, onSetSelectedBook, onDeleteBook }) {
    const [selectedPreview, setselectedPreview] = useState(null)

    return (
        <section className="book-list">
            {books.map((book, idx) => {
                return (
                    <div key={book.title + idx} className="book-item">
                        <BookPreview
                            id={book.id}
                            title={book.title}
                            listPrice={book.listPrice}
                            thumbnail={book.thumbnail}
                        />
                        <span>
                            <button onClick={() => onDeleteBook(book.id)}>Delete</button>

                            <NavLink to={`/book/edit/${book.id}`}>
                                <button>Edit</button>
                            </NavLink>
                            <NavLink to={`/book/${book.id}`}>
                                <button onClick={() => onSetSelectedBook(book)}>Show Details</button>
                            </NavLink>
                        </span>
                    </div>
                )
            })}
        </section>
    )
}
