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
        <dialog onClose={onCloseDetails} ref={elDialog} closedby="any" className="book-details">
            <div>
                <img src={selectedBook && selectedBook.imgUrl} alt="" />
                <p className="details-title">Title: {selectedBook && selectedBook.title}</p>
                <p className="details-price">Price: {selectedBook && selectedBook.listPrice}</p>
                <p className="details-description">
                    description: {selectedBook && selectedBook.description}
                </p>
            </div>
        </dialog>
    )
}
