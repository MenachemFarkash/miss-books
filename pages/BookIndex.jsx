const { useEffect, useState } = React
import { BookDetails } from "../cmps/BookDetails.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { BookPreview } from "../cmps/BookPreview.jsx"
import { bookService } from "../services/book.service.js"

export function BookIndex() {
    const [books, setBooks] = useState([])
    const [selectedBook, setSelectedBook] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDe)

    useEffect(() => {
        loadBooks()
    }, [])

    function loadBooks() {
        return bookService.query().then((books) => setBooks(books))
    }

    function onSetSelectedBook(book) {
        setSelectedBook(book)
    }

    function onCloseDetails() {
        setSelectedBook(null)
    }

    return (
        <section className="book-index">
            <h2>Welcome to the library</h2>
            <BookList books={books} onSetSelectedBook={onSetSelectedBook} />
            <BookDetails selectedBook={selectedBook} onCloseDetails={onCloseDetails} />
        </section>
    )
}
