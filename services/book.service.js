import { utilService } from "./util.service.js"
import { storageService } from "./async-storage.service.js"

const BOOK_KEY = "booksDB"
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
}

const books = [
    {
        id: "OXeMG8wNskc",
        title: "metus hendrerit",
        description: "placerat nisi sodales suscipit tellus",
        thumbnail: "http://ca.org/books-photos/20.jpg",
        listPrice: {
            amount: 109,
            currencyCode: "EUR",
            isOnSale: false,
        },
    },
    {
        id: "OXeMG8wNskc",
        title: "Harry Potter 1",
        description: "placerat nisi sodales suscipit tellus",
        thumbnail: "http://ca.org/books-photos/20.jpg",
        listPrice: {
            amount: 119,
            currencyCode: "EUR",
            isOnSale: true,
        },
    },
    {
        id: "OXeMG8wNskc",
        title: "Pokemon Go",
        description: "placerat nisi sodales suscipit tellus",
        thumbnail: "http://ca.org/books-photos/20.jpg",
        listPrice: {
            amount: 89,
            currencyCode: "EUR",
            isOnSale: false,
        },
    },
    {
        id: "OXeMG8wNskc",
        title: "The Monster Under My Bed",
        description: "placerat nisi sodales suscipit tellus",
        thumbnail: "http://ca.org/books-photos/20.jpg",
        listPrice: {
            amount: 70,
            currencyCode: "USD",
            isOnSale: false,
        },
    },
]

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY).then((books) => {
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

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = []
        const titles = [
            "Dune",
            "It",
            "Emma",
            "Dracula",
            "Rebecca",
            "Matilda",
            "Coraline",
            "Shōgun",
            "Beloved",
            "Persuasion",
            "Utopia",
            "Inferno",
            "Leviathan",
            "Hyperion",
            "Neuromancer",
            "Annihilation",
            "Neverwhere",
            "Piranesi",
            "Klara",
            "Sapiens",
        ]
        for (let i = 0; i < 6; i++) {
            const title = titles[utilService.getRandomIntInclusive(0, titles.length - 1)]
            books.push(_createBook(title, utilService.getRandomIntInclusive(80, 300)))
        }
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(title, listPrice = 250) {
    const book = getEmptyBook(title, listPrice)
    book.id = utilService.makeId()
    book.description = utilService.makeLorem(20)
    return book
}

function getEmptyBook(title = "", listPrice = "") {
    return { title, listPrice }
}
