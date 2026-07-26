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

    return (
        <dialog onClose={onCloseDetails} ref={elDialog} closedby="any">
            <div className="book-details-dialog">
                <section className="book-details-image-container">
                    <img src={selectedBook && selectedBook.thumbnail} alt="" />
                </section>

                <section className="book-details-container">
                    <section className="book-main-info-container">
                        <h2 className="book-title">{selectedBook && selectedBook.title}</h2>
                        <h3 className="book-subtitle">{selectedBook && selectedBook.subtitle}</h3>
                        <span className="book-author">
                            <img
                                src="assets/icons/author-icon-light.png"
                                alt=""
                                className="icon book-author-icon"
                            />
                            <span className="author">{selectedBook && selectedBook.authors[0]}</span>
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
                                    {selectedBook && selectedBook.pageCount} (
                                    {selectedBook && selectedBook.readingDifficulty})
                                </span>
                            </span>
                            <span className="book-main-category">
                                <img
                                    src="assets/icons/tag-icon-light.png"
                                    className="icon book-main-category-icon"
                                    alt=""
                                />
                                <span className="tag main-category">
                                    {selectedBook && selectedBook.categories[0]}
                                </span>
                            </span>
                        </section>
                    </section>

                    <section className="book-description-container">
                        <h3>Description</h3>
                        <p className="book-description">{selectedBook && selectedBook.description}</p>
                    </section>

                    <section className="book-metadata-container">
                        <span className="book-categories">
                            <h3>Categories</h3>
                            {selectedBook &&
                                selectedBook.categories.map((categorie, idx) => {
                                    return (
                                        <span className="tag book-lang-tag" key={categorie + idx}>
                                            {categorie}
                                        </span>
                                    )
                                })}
                        </span>
                        <span className="book-language">
                            <h3>Languge</h3>
                            <span className="tag book-lang-tag">{selectedBook && selectedBook.language}</span>
                        </span>
                        <div className="book-price">
                            <span
                                className={`price ${selectedBook && selectedBook.listPrice.amount > 150 ? 'expensive' : selectedBook && selectedBook.listPrice.amount <= 20 ? 'cheap' : ''}`}
                            >
                                <span className="book-price-currency">
                                    {selectedBook && selectedBook.listPrice.currencyCode === 'ILS'
                                        ? '₪'
                                        : selectedBook && selectedBook.listPrice.currencyCode === 'USD'
                                          ? '$'
                                          : '€'}
                                </span>
                                {selectedBook && selectedBook.listPrice.amount}
                            </span>
                            {selectedBook && selectedBook.listPrice.isOnSale && (
                                <span
                                    className={`tag book-on-sale-tag ${selectedBook && selectedBook.listPrice.isOnSale && 'sale'}`}
                                >
                                    On Sale
                                </span>
                            )}
                        </div>
                    </section>
                </section>
                {selectedBook && selectedBook.ageStatus === 'Vintage' ? (
                    <span className="splash">Vintage</span>
                ) : selectedBook && selectedBook.ageStatus === 'New' ? (
                    <span className="splash">New</span>
                ) : (
                    ''
                )}
                <span className="close-button" onClick={onCloseDetails}>
                    Close
                </span>
            </div>
        </dialog>
    )
}
