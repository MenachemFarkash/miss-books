const { useEffect, useState } = React
import { BookDetails } from "../cmps/BookDetails.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { BookPreview } from "../cmps/BookPreview.jsx"
import { FilterBy } from "../cmps/FilterBy.jsx"
import { bookService } from "../services/book.service.js"

export function BookIndex() {
    const [books, setBooks] = useState([])
    const [selectedBook, setSelectedBook] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        return bookService.query(filterBy).then((books) => setBooks(books))
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
            <FilterBy filterBy={filterBy} setFilterBy={setFilterBy} />

            <BookList books={books} onSetSelectedBook={onSetSelectedBook} />
            <BookDetails selectedBook={selectedBook} onCloseDetails={onCloseDetails} />
        </section>
    )
}
