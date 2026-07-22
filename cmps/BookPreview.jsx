export function BookPreview({ id, title, listPrice }) {
    return (
        <div className="book-item">
            <p className="item-id">{id}</p>
            <p className="item-title">{title}</p>
            <p className="item-price">Price: {listPrice}</p>
            <button className="show-details">Show Details</button>
        </div>
    )
}
