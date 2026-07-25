export function BookPreview({ id, title, listPrice, thumbnail }) {
    return (
        <div>
            <img src={thumbnail} alt="" />
            <p className="item-title">{title}</p>
            <p className="item-price">Price: {listPrice.amount}</p>
        </div>
    )
}
