const { useEffect, useState } = React

export function FilterBy({ filterBy, setFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        setFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function changeFilter({ target }) {
        const { type, value, name } = target
        setFilterByToEdit((prev) => ({ ...prev, [name]: type === "number" ? +value : value }))
    }

    return (
        <section className="filter-by-container">
            <fieldset>
                <legend>Filter Options</legend>
                <input
                    type="text"
                    name="title"
                    onChange={changeFilter}
                    value={filterByToEdit.title}
                    placeholder="Title"
                    className="title-filter"
                />
                <input
                    type="number"
                    name="listPrice"
                    onChange={changeFilter}
                    value={filterByToEdit.listPrice || ""}
                    placeholder="Price"
                    className="list-price-filter"
                />
            </fieldset>
        </section>
    )
}
