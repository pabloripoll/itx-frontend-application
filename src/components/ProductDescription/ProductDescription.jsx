const FieldItem = ({ label, value }) => (
    <li>
        <span>{label}:</span>
        <p className="mb-0">{value || 'N/A'}</p>
    </li>
);

const FieldRow = ({ label, value }) => (
    <tr>
        <th className="text-muted fw-normal">{label}</th>
        <td>{value || 'N/A'}</td>
    </tr>
);

const ProductDescription = ({ product }) => {
    return (
        <>
            <h3>
                {product.model}
                <span>Brand: {product.brand}</span>
            </h3>
            <div className="product__details__price">
                {product.price ? `${product.price} €` : 'N/A'}
            </div>
        </>
    );
};

export { FieldItem, FieldRow };
export default ProductDescription;
