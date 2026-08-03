const { useState } = React
import { bookService } from '../services/book.service.js'
import { BookReviews } from './BookReviews.jsx'

const { useRef, useEffect } = React
const { useParams } = ReactRouter
const { useNavigate } = ReactRouterDOM

export function BookDetails() {
    const [book, setBook] = useState()

    const navigate = useNavigate()

    const { id: bookId } = useParams()

    useEffect(() => {
        bookService.get(bookId).then((book) => {
            setBook(book)
        })
    }, [bookId])

    function difficulty() {
        if (book.pageCount < 100) return 'Light Reading'
        else if (book.pageCount >= 500) return 'Serious Reading'
        else return 'Descent Reading'
    }

    function currency() {
        switch (book.listPrice.currencyCode) {
            case 'USD':
                return '$'
            case 'ILS':
                return '₪'
            case 'EUR':
                return '€'

            default:
                return ''
        }
    }

    function priceClass() {
        const classList = ['price']
        const { amount } = book.listPrice

        if (amount > 150) classList.push('expensive')
        if (amount < 40) classList.push('cheap')

        return classList.join(' ')
    }

    function ageStatus() {
        let status = ''
        if (book.publishedDate - new Date().getFullYear() >= -1) {
            status = 'New'
        } else if (book.publishedDate <= new Date().getFullYear() - 10) {
            status = 'Vintage'
        }

        return status
    }

    return (
        <div className="book-details-main-container">
            {book && (
                <div className="book-details-dialog">
                    <section className="book-details-image-container">
                        <img src={book && book.thumbnail} alt="" />
                    </section>

                    <section className="book-details-container">
                        <section className="book-main-info-container">
                            <h2 className="book-title">{book && book.title}</h2>
                            <h3 className="book-subtitle">{book && book.subtitle}</h3>
                            <span className="book-author">
                                <img
                                    src="assets/icons/author-icon-light.png"
                                    alt=""
                                    className="icon book-author-icon"
                                />
                                <span className="author">{book && book.authors[0]}</span>
                            </span>
                            <section className="book-details-info">
                                <span className="book-release-date">
                                    <img
                                        src="assets/icons/calendar-icon-light.png"
                                        className="icon book-release-date-icon"
                                        alt=""
                                    />
                                    <span className="release-date">{book && book.publishedDate}</span>
                                </span>
                                <span className="book-page-count">
                                    <img
                                        src="assets/icons/pages-icon-light.png"
                                        className="icon book-page-count-icon"
                                        alt=""
                                    />
                                    <span className="page-count">
                                        {book && book.pageCount} ({difficulty()})
                                    </span>
                                </span>
                            </section>
                        </section>

                        <section className="book-description-container">
                            <h3>Description</h3>
                            <p className="book-description">{book && book.description}</p>
                        </section>

                        <section className="book-metadata-container">
                            <span className="book-categories">
                                <h3>Categories</h3>
                                {book &&
                                    book.categories.map((categorie, idx) => {
                                        return (
                                            <span className="tag book-lang-tag" key={categorie + idx}>
                                                {categorie}
                                            </span>
                                        )
                                    })}
                            </span>
                            <span className="book-language">
                                <h3>Languge</h3>
                                <span className="tag book-lang-tag">{book && book.language}</span>
                            </span>
                            <div className="book-price">
                                <span className={priceClass()}>
                                    <span className="book-price-currency">{currency()}</span>
                                    {book && book.listPrice.amount}
                                </span>
                                {book && book.listPrice.isOnSale && (
                                    <span
                                        className={`tag book-on-sale-tag ${book && book.listPrice.isOnSale && 'sale'}`}
                                    >
                                        On Sale
                                    </span>
                                )}
                            </div>
                        </section>
                        <section className="book-reviews-container">
                            <BookReviews bookId={bookId} />
                        </section>
                    </section>
                    <span className="splash">{ageStatus()}</span>

                    <span className="next-book-button" onClick={() => navigate(`/book/${book.nextBookId}`)}>
                        {'>'}
                    </span>
                    <span className="prev-book-button" onClick={() => navigate(`/book/${book.prevBookId}`)}>
                        {'<'}
                    </span>
                </div>
            )}
        </div>
    )
}
