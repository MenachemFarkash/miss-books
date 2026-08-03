import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'booksDB'
const REVIEW_KEY = 'reviewsDB'
_createBooks()
_createReviews()

export const bookService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
    getEmptyBook,
    getBookReviews,
    getEmptyReview,
    addReview,
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY).then((books) => {
        if (filterBy.title) {
            const regExp = new RegExp(filterBy.title, 'i')
            books = books.filter((book) => regExp.test(book.title))
        }
        if (filterBy.listPrice) {
            books = books.filter((book) => book.listPrice.amount <= filterBy.listPrice)
        }
        if (filterBy.author) {
            const regExp = new RegExp(filterBy.author, 'i')
            books = books.filter((book) => regExp.test(book.authors[0]))
        }
        if (filterBy.publishDate) {
            books = books.filter((book) => book.publishedDate >= filterBy.publishDate)
        }
        if (filterBy.pageCount) {
            books = books.filter((book) => book.pageCount <= filterBy.pageCount)
        }
        if (filterBy.language) {
            books = books.filter((book) => book.language === filterBy.language)
        }
        if (filterBy.category) {
            books = books.filter((book) => book.categories[0] === filterBy.category)
        }

        return books
    })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId).then((book) => {
        book = _setNextPrevBookId(book)
        return book
    })
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getDefaultFilter(filterBy = { title: '', listPrice: null }) {
    return { title: filterBy.title, listPrice: filterBy.listPrice }
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (books && books.length > 0) return

    const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
    const currencies = ['ILS', 'USD', 'EUR']
    const langs = ['en', 'he', 'fr']
    books = []
    for (let i = 0; i < 20; i++) {
        const book = {
            id: utilService.makeId(),
            title: utilService.makeLorem(2),
            subtitle: utilService.makeLorem(4),
            authors: [utilService.makeLorem(1)],
            publishedDate: utilService.getRandomIntInclusive(1990, 2026),
            description: utilService.makeLorem(20),
            pageCount: utilService.getRandomIntInclusive(20, 600),
            categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
            thumbnail: `assets/img/${i + 1}.jpeg`,
            language: langs[utilService.getRandomIntInclusive(0, langs.length - 1)],
            listPrice: {
                amount: utilService.getRandomIntInclusive(20, 180),
                currencyCode: currencies[utilService.getRandomIntInclusive(0, currencies.length - 1)],
                isOnSale: Math.random() > 0.7,
            },
        }

        books.push(book)
    }
    utilService.saveToStorage(BOOK_KEY, books)
}

function getRandomBookId() {
    const books = utilService.loadFromStorage(BOOK_KEY)

    return books[utilService.getRandomIntInclusive(0, books.length - 1)].id
}

function _createBook(title, listPrice = 250) {
    const book = getEmptyBook(title, listPrice)
    book.id = utilService.makeId()
    book.description = utilService.makeLorem(20)
    book.imgUrl = `assets/img/${utilService.getRandomIntInclusive(1, 20)}.jpeg`
    return book
}

function _setNextPrevBookId(book) {
    return storageService.query(BOOK_KEY).then((books) => {
        const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextBookId = nextBook.id
        book.prevBookId = prevBook.id
        return book
    })
}

function getEmptyBook() {
    return {
        title: '',
        subtitle: '',
        authors: [],
        publishedDate: 1950,
        description: '',
        pageCount: 0,
        categories: [],
        thumbnail: ``,
        language: '',
        listPrice: {
            amount: 0,
            currencyCode: '',
            isOnSale: Math.random() > 0.7,
        },
    }
}

window.getBookReviews = getBookReviews

function _createReviews() {
    let reviews = utilService.loadFromStorage(REVIEW_KEY)
    if (reviews && reviews.length > 0) return

    reviews = []
    for (let i = 0; i < 20; i++) {
        const review = {
            bookId: getRandomBookId(),
            fullName: utilService.makeLorem(2),
            rating: utilService.getRandomIntInclusive(1, 5),
            readAt: Date.now(),
        }

        reviews.push(review)
    }

    utilService.saveToStorage(REVIEW_KEY, reviews)
}

function getEmptyReview() {
    return {
        fullName: '',
        rating: 0,
        readAt: Date.now(),
    }
}

function getBookReviews(bookId) {
    return storageService
        .query(REVIEW_KEY, bookId)
        .then((reviews) => reviews.filter((review) => review.bookId === bookId))
}

function addReview(review) {
    return storageService.post(REVIEW_KEY, review)
}
