export function BookPreview({ id, title, listPrice, imgUrl }) {
    return (
        <div>
            <img src={imgUrl} alt="" />
            <p className="item-title">{title}</p>
            <p className="item-price">Price: {listPrice}</p>
        </div>
    )
}
