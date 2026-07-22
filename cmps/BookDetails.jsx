const { useRef, useEffect } = React

export function BookDetails({ id, title, listPrice, selectedBook }) {
    const elDialog = useRef()

    useEffect(() => {
        if (selectedBook) {
            elDialog.current.showModal()
        } else {
            elDialog.current.close()
        }
    }, [selectedBook])

    return (
        <dialog ref={elDialog} closedby="any" className="book-item">
            <p className="item-id">{selectedBook && selectedBook.id}</p>
            <p className="item-title">{selectedBook && selectedBook.title}</p>
            <p className="item-price">Price: {selectedBook && selectedBook.listPrice}</p>
        </dialog>
    )
}
