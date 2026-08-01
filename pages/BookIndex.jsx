const { useEffect, useState } = React
const { useNavigate } = ReactRouter
const { Outlet } = ReactRouterDOM
import { BookDetails } from '../cmps/BookDetails.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { BookPreview } from '../cmps/BookPreview.jsx'
import { FilterBy } from '../cmps/FilterBy.jsx'
import { bookService } from '../services/book.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

export function BookIndex() {
    const [books, setBooks] = useState([])
    const [selectedBook, setSelectedBook] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    const navigate = useNavigate()

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
        navigate('/book')
    }

    function onDeleteBook(bookId) {
        bookService.remove(bookId).then(() => {
            setBooks((prev) => prev.filter((book) => book.id !== bookId))
            onClearFilter()
            showSuccessMsg(`Book ${bookId} deleted`)
        })
    }

    function onClearFilter() {
        setFilterBy(bookService.getDefaultFilter())
    }

    return (
        <section className="book-index">
            <h2>Welcome to the library</h2>
            <FilterBy filterBy={filterBy} setFilterBy={setFilterBy} />

            <BookList books={books} onSetSelectedBook={onSetSelectedBook} onDeleteBook={onDeleteBook} />
            <Outlet />
        </section>
    )
}
