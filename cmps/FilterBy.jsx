export function FilterBy() {
    return (
        <section className="filter-by-container">
            <fieldset>
                <legend>Filter Options</legend>
                <label htmlFor="title-filter-input">Title</label>
                <input type="text" className="title-filter" name="title-filter-input" />
                <label htmlFor="list-price-filter-input">Price</label>
                <input type="number" className="list-price-filter" name="list-price-filter-input" />
            </fieldset>
        </section>
    )
}
