import { BookPreview } from "./BookPreview.jsx"

export function BookList({ books }) {
    return (
        <section className="book-list">
            {books.map((book, idx) => {
                return (
                    <BookPreview
                        id={book.id}
                        title={book.title}
                        listPrice={book.listPrice}
                        key={book.title + idx}
                    />
                )
            })}
        </section>
    )
}
