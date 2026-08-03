export function BookReview({ fullName, rating, readAt }) {
    function formatDate(readAt) {
        return new Date(readAt).toLocaleDateString()
    }
    return (
        <div>
            <p>Name: {fullName}</p>
            <p>Rating: {'⭐'.repeat(rating)}</p>
            <p>Reading Date: {formatDate(readAt)}</p>
        </div>
    )
}
