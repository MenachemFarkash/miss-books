const { useEffect, useState } = React
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"

export function BookIndex() {
    const [books, setBooks] = useState([])

    useEffect(() => {
        loadBooks()
    }, [])

    function loadBooks() {
        return bookService.query().then((books) => setBooks(books))
    }

    return (
        <section className="book-index">
            <h2>Welcome to the library</h2>
            <BookList books={books} />
        </section>
    )
}
