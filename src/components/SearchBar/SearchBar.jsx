const SearchBar = ({ value, onChange }) => {
    return (
        <div className="input-group mb-4">
            <span className="input-group-text">🔍</span>
            <input
                type="text"
                className="form-control"
                placeholder="Search by brand or model..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            {value && (
                <button
                    className="btn btn-outline-secondary"
                    onClick={() => onChange('')}
                >
                    ✕
                </button>
            )}
        </div>
    );
};

export default SearchBar;
