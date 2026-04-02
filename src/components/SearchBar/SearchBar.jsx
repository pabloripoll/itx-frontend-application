const SearchBar = ({ value, onChange }) => {
    return (
        <div className="col-lg-8 col-md-8">
            <div className="input-group">
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
                        <i className="fa fa-times"></i>
                    </button>
                )}
                <span className="input-group-text">
                    <i className="fa fa-search"></i>
                </span>
            </div>
        </div>
    );
};

export default SearchBar;
