import { bookService } from '../services/book.service.js'
import { showSuccessMsg } from '../services/event-bus.service.js'

const { useEffect, useState } = React
const { useParams, useNavigate } = ReactRouter
const { NavLink } = ReactRouterDOM

export function BookEdit() {
    const [book, setBook] = useState(bookService.getEmptyBook())

    const navigate = useNavigate()
    const { id: bookId } = useParams()

    useEffect(() => {
        if (!bookId) return

        bookService.get(bookId).then(setBook)
    }, [])

    function handleChange({ target }) {
        const { value, type, name } = target
        if (name === 'ListPrice' && type === 'number') {
            setBook((prev) => ({ ...prev, listPrice: { ...prev.listPrice, amount: +value } }))
        }
        setBook((prev) => ({ ...prev, [name]: type === 'number' ? +value : value }))
    }

    function onSaveBook(ev) {
        ev.preventDefault()

        bookService.save(book).then((book) => {
            showSuccessMsg(`Book ${book.id} edited successfuly`)
            navigate('/book')
        })
    }

    return (
        <form onSubmit={onSaveBook}>
            <input value={book.title} onChange={handleChange} type="text" name="title" placeholder="Title" />
            <input
                value={book.listPrice.amount || ''}
                onChange={handleChange}
                type="number"
                name="ListPrice"
                placeholder="Price"
            />

            <button>Save</button>
            <NavLink to="/book">
                <button type="button">Cancel</button>
            </NavLink>
        </form>
    )
}
