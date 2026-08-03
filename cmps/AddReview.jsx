import { bookService } from '../services/book.service.js'

const { useState, useEffect } = React
const { useParams } = ReactRouter
const { useNavigate } = ReactRouterDOM

export function AddReview() {
    const [review, setReview] = useState(bookService.getEmptyReview())

    const { id: bookId } = useParams()

    const navigate = useNavigate()

    function handleChange({ target }) {
        const { value, type, name } = target
        setReview((prev) => ({ ...prev, [name]: type === 'number' ? +value : value }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()

        review.bookId = bookId
        bookService.addReview(review)
        navigate(`/book/${bookId}`)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <fieldset className="add-review-container">
                    <legend>Write A Review</legend>
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={review.fullName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="rating"
                        placeholder="Rating"
                        value={review.rating || ''}
                        onChange={handleChange}
                        required
                    />
                    <input type="date" name="readAt" value={review.readAt} onChange={handleChange} required />
                    <span>
                        <button>Post Review</button>
                        <span> | </span>
                        <button type="button">Cancle</button>
                    </span>
                </fieldset>
            </form>
        </div>
    )
}
