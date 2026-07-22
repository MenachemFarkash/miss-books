const { useState } = React
import { BookDetails } from "./BookDetails.jsx"
import { BookPreview } from "./BookPreview.jsx"

export function BookList({ books, onSetSelectedBook }) {
    const [selectedPreview, setselectedPreview] = useState(null)
    return (
        <section className="book-list">
            {books.map((book, idx) => {
                return (
                    <div key={book.title + idx}>
                        <BookPreview id={book.id} title={book.title} listPrice={book.listPrice} />

                        <button onClick={() => onSetSelectedBook(book)}>Show Details</button>
                    </div>
                )
            })}
        </section>
    )
}
