
const FilterItems = ({filter}) => {
    return (
        <div className="mt-3">
        <p>{filter?.title}</p>
        {filter?.options?.map((option, index) => (
            <div key={index}>
            <input
                type="checkbox"
                id={`${filter.title}-${index}`}
                className="form-check-input"
            />
            <label htmlFor={`${filter.title}-${index}`}>{option}</label>
            </div>
        ))}
        </div>
    )
}

export default FilterItems;