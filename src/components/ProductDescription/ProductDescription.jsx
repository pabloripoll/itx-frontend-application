const Field = ({ label, value }) => (
    <li>
        <span>{label}:</span>
        <p className="mb-0">{value || 'N/A'}</p>
    </li>
);

const ProductDescription = ({ product }) => {
    return (
        <div className="product__details__text">
            <h3>
                {product.model}
                <span>Brand: {product.brand}</span>
            </h3>
            <div className="product__details__price">
                {product.price ? `${product.price} €` : 'N/A'}
            </div>
            <div className="product__details__widget">
                <ul>
                    <Field label="CPU" value={product.cpu} />
                    <Field label="RAM" value={product.ram} />
                    <Field label="Operating System" value={product.os} />
                    <Field label="Screen Resolution" value={product.displayResolution} />
                    <Field label="Battery" value={product.battery} />
                    <Field label="Rear Camera" value={product.primaryCamera?.join(', ')} />
                    <Field label="Front Camera" value={product.secondaryCameras?.join(', ')} />
                    <Field label="Dimensions" value={product.dimentions} />
                    <Field label="Weight" value={product.weight ? `${product.weight} g` : null} />
                </ul>
            </div>
        </div>
    );
};

export default ProductDescription;
