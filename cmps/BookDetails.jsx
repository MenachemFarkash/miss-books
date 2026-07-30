const { useRef, useEffect } = React

export function BookDetails({ selectedBook, onCloseDetails }) {
    const elDialog = useRef()

    useEffect(() => {
        if (selectedBook) {
            elDialog.current.showModal()
        } else {
            elDialog.current.close()
        }
    }, [selectedBook])

    function difficulty() {
        if (selectedBook.pageCount < 100) return "Light Reading"
        else if (selectedBook.pageCount >= 500) return "Serious Reading"
        else return "Descent Reading"
    }

    function currency() {
        switch (selectedBook.listPrice.currencyCode) {
            case "USD":
                return "$"
            case "ILS":
                return "₪"
            case "EUR":
                return "€"

            default:
                return ""
        }
    }

    function priceClass() {
        const classList = ["price"]
        const { amount } = selectedBook.listPrice

        if (amount > 150) classList.push("expensive")
        if (amount < 40) classList.push("cheap")

        return classList.join(" ")
    }

    function ageStatus() {
        let status = ""
        if (selectedBook.publishedDate - new Date().getFullYear() >= -1) {
            status = "New"
        } else if (selectedBook.publishedDate <= new Date().getFullYear() - 10) {
            status = "Vintage"
        } else return status

        return status
    }

    return (
        <dialog onClose={onCloseDetails} ref={elDialog} closedby="any">
            {selectedBook && (
                <div className="book-details-dialog">
                    <section className="book-details-image-container">
                        <img src={selectedBook && selectedBook.thumbnail} alt="" />
                    </section>

                    <section className="book-details-container">
                        <section className="book-main-info-container">
                            <h2 className="book-title">{selectedBook && selectedBook.title}</h2>
                            <h3 className="book-subtitle">
                                {selectedBook && selectedBook.subtitle}
                            </h3>
                            <span className="book-author">
                                <img
                                    src="assets/icons/author-icon-light.png"
                                    alt=""
                                    className="icon book-author-icon"
                                />
                                <span className="author">
                                    {selectedBook && selectedBook.authors[0]}
                                </span>
                            </span>
                            <section className="book-details-info">
                                <span className="book-release-date">
                                    <img
                                        src="assets/icons/calendar-icon-light.png"
                                        className="icon book-release-date-icon"
                                        alt=""
                                    />
                                    <span className="release-date">
                                        {selectedBook && selectedBook.publishedDate}
                                    </span>
                                </span>
                                <span className="book-page-count">
                                    <img
                                        src="assets/icons/pages-icon-light.png"
                                        className="icon book-page-count-icon"
                                        alt=""
                                    />
                                    <span className="page-count">
                                        {selectedBook && selectedBook.pageCount} ({difficulty()})
                                    </span>
                                </span>
                            </section>
                        </section>

                        <section className="book-description-container">
                            <h3>Description</h3>
                            <p className="book-description">
                                {selectedBook && selectedBook.description}
                            </p>
                        </section>

                        <section className="book-metadata-container">
                            <span className="book-categories">
                                <h3>Categories</h3>
                                {selectedBook &&
                                    selectedBook.categories.map((categorie, idx) => {
                                        return (
                                            <span
                                                className="tag book-lang-tag"
                                                key={categorie + idx}
                                            >
                                                {categorie}
                                            </span>
                                        )
                                    })}
                            </span>
                            <span className="book-language">
                                <h3>Languge</h3>
                                <span className="tag book-lang-tag">
                                    {selectedBook && selectedBook.language}
                                </span>
                            </span>
                            <div className="book-price">
                                <span className={priceClass()}>
                                    <span className="book-price-currency">{currency()}</span>
                                    {selectedBook && selectedBook.listPrice.amount}
                                </span>
                                {selectedBook && selectedBook.listPrice.isOnSale && (
                                    <span
                                        className={`tag book-on-sale-tag ${selectedBook && selectedBook.listPrice.isOnSale && "sale"}`}
                                    >
                                        On Sale
                                    </span>
                                )}
                            </div>
                        </section>
                    </section>
                    {ageStatus()}

                    <span className="close-button" onClick={onCloseDetails}>
                        Close
                    </span>
                </div>
            )}
        </dialog>
    )
}
