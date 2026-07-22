export function BookDetails({ id, title, listPrice }) {
    return (
        <dialog className="book-item">
            <p className="item-id">{id}</p>
            <p className="item-title">{title}</p>
            <p className="item-price">Price: {listPrice}</p>
        </dialog>
    )
}
