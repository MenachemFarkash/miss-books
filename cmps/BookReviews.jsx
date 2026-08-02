const { useEffect, useState } = React
import { bookService } from '../services/book.service.js'
import { BookReview } from './BookReview.jsx'

export function BookReviews({ bookId }) {
    const [reviews, setReviews] = useState()

    useEffect(() => {
        const reviews = bookService.getBookReviews(bookId).then(setReviews)
    }, [bookId])

    return (
        <div className="reviews-container">
            <h1>REVIEWS</h1>
            {!reviews || reviews.length <= 0 ? (
                <h2>No Reviews For This Book</h2>
            ) : (
                reviews.map((review) => {
                    return (
                        <BookReview
                            key={review.bookId + review.fullName}
                            fullName={review.fullName}
                            rating={review.rating}
                            readAt={review.readAt}
                        />
                    )
                })
            )}
        </div>
    )
}
