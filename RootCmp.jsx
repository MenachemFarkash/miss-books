const { HashRouter: Router, Routes, Route } = ReactRouterDOM

import { AppHeader } from "./cmps/AppHeader.jsx"
import { Home } from "./pages/Home.jsx"
import { About } from "./pages/About.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { FilterBy } from "./cmps/FilterBy.jsx"
import { BookEdit } from "./pages/BookEdit.jsx"

export function RootCmp() {
    return (
        <Router>
            <section className="app main-layout">
                <AppHeader />

                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/book" element={<BookIndex />} />
                        <Route path="/book/edit" element={<BookEdit />} />
                        <Route path="/book/edit/:id" element={<BookEdit />} />
                        <Route path="/book/:id" element={<BookIndex />} />
                    </Routes>
                </main>
            </section>
        </Router>
    )
}
