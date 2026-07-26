import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'booksDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY).then((books) => {
        if (filterBy.title) {
            const regExp = new RegExp(filterBy.title, 'i')
            books = books.filter((book) => regExp.test(book.title))
        }
        if (filterBy.listPrice) {
            books = books.filter((book) => book.listPrice <= filterBy.listPrice)
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
    const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
    const currencies = ['ILS', 'USD', 'EUR']
    const books = []
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
            language: 'en',
            listPrice: {
                amount: utilService.getRandomIntInclusive(20, 180),
                currencyCode: currencies[utilService.getRandomIntInclusive(0, currencies.length - 1)],
                isOnSale: Math.random() > 0.7,
            },
        }

        book.readingDifficulty =
            book.pageCount < 100
                ? 'Light Reading'
                : book.pageCount >= 500
                  ? 'Serious Reading'
                  : book.pageCount < 500 && book.pageCount > 100
                    ? 'Descent Reading'
                    : ''

        book.ageStatus =
            book.publishedDate - new Date().getFullYear() >= -1
                ? 'New'
                : book.publishedDate <= new Date().getFullYear() - 10
                  ? 'Vintage'
                  : ''
        books.push(book)
    }
    utilService.saveToStorage(BOOK_KEY, books)
}

function _createBook(title, listPrice = 250) {
    const book = getEmptyBook(title, listPrice)
    book.id = utilService.makeId()
    book.description = utilService.makeLorem(20)
    book.imgUrl = `assets/img/${utilService.getRandomIntInclusive(1, 20)}.jpeg`
    return book
}

function getEmptyBook(title = '', listPrice = '') {
    return { title, listPrice }
}
