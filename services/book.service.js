import { utilService } from "./util.service.js"
import { storageService } from "./async-storage.service.js"

const BOOK_KEY = "booksDB"
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
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
        if (filterBy.title) {
            const regExp = new RegExp(filterBy.title, "i")
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

function getDefaultFilter(filterBy = { title: "", listPrice: null }) {
    return { title: filterBy.title, listPrice: filterBy.listPrice }
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = []
        const titles = [
            "To Kill a Mockingbird",
            "1984",
            "Pride and Prejudice",
            "The Great Gatsby",
            "Moby-Dick",
            "War and Peace",
            "Crime and Punishment",
            "The Catcher in the Rye",
            "The Hobbit",
            "The Lord of the Rings",
            "Brave New World",
            "The Grapes of Wrath",
            "Jane Eyre",
            "Wuthering Heights",
            "Dracula",
            "Frankenstein",
            "The Odyssey",
            "The Iliad",
            "The Picture of Dorian Gray",
            "The Count of Monte Cristo",
            "Les Misérables",
            "The Adventures of Huckleberry Finn",
            "Alice's Adventures in Wonderland",
            "Treasure Island",
            "The Little Prince",
            "Fahrenheit 451",
            "Animal Farm",
            "Dune",
            "The Name of the Wind",
            "The Alchemist",
            "The Road",
            "Life of Pi",
            "The Book Thief",
            "The Kite Runner",
            "A Game of Thrones",
            "The Chronicles of Narnia",
            "The Shining",
            "The Stand",
            "The Martian",
            "Project Hail Mary",
        ]
        for (let i = 0; i < 40; i++) {
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
    book.imgUrl = `assets/img/${utilService.getRandomIntInclusive(1, 20)}.jpeg`
    return book
}

function getEmptyBook(title = "", listPrice = "") {
    return { title, listPrice }
}
