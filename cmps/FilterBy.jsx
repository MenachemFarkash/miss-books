const { useEffect, useState } = React

export function FilterBy({ filterBy, setFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        setFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function changeFilter({ target }) {
        const { type, value, name } = target
        setFilterByToEdit((prev) => ({ ...prev, [name]: type === 'number' ? +value : value }))
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
                    value={filterByToEdit.listPrice || ''}
                    placeholder="Price"
                    className="list-price-filter"
                />
                <input
                    type="text"
                    name="author"
                    onChange={changeFilter}
                    value={filterByToEdit.author || ''}
                    placeholder="Author"
                    className="author-filter"
                />
                <input
                    type="number"
                    name="publishDate"
                    onChange={changeFilter}
                    value={filterByToEdit.publishDate || ''}
                    placeholder="Publish Date"
                    className="publish-date-filter"
                />
                <input
                    type="number"
                    name="pageCount"
                    onChange={changeFilter}
                    value={filterByToEdit.pageCount || ''}
                    placeholder="Page Count"
                    className="page-count-filter"
                />
                <select name="language" onChange={changeFilter} value={filterByToEdit.language}>
                    <option value="">All Languages</option>
                    <option value="en">English</option>
                    <option value="he">Hebrew</option>
                    <option value="fr">French</option>
                </select>
                <select name="category" onChange={changeFilter} value={filterByToEdit.category}>
                    <option value="">All Catergories</option>
                    <option value="Love">Love</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Poetry">Poetry</option>
                    <option value="Computers">Computers</option>
                    <option value="Religion">Religion</option>
                </select>
            </fieldset>
        </section>
    )
}
