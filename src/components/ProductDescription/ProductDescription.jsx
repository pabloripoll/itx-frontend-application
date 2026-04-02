const Field = ({ label, value }) => (
    <tr>
        <th className="text-muted fw-normal w-50">{label}</th>
        <td>{value || 'N/A'}</td>
    </tr>
);

const ProductDescription = ({ product }) => {
    return (
        <div className="mb-4">
            <h2 className="mb-1">{product.brand}</h2>
            <h4 className="text-muted mb-3">{product.model}</h4>
            <table className="table table-borderless table-sm">
                <tbody>
                    <Field label="Price" value={product.price ? `${product.price} €` : null} />
                    <Field label="CPU" value={product.cpu} />
                    <Field label="RAM" value={product.ram} />
                    <Field label="Operating System" value={product.os} />
                    <Field label="Screen Resolution" value={product.displayResolution} />
                    <Field label="Battery" value={product.battery} />
                    <Field label="Rear Camera" value={product.primaryCamera?.join(', ')} />
                    <Field label="Front Camera" value={product.secondaryCameras?.join(', ')} />
                    <Field label="Dimensions" value={product.dimentions} />
                    <Field label="Weight" value={product.weight ? `${product.weight} g` : null} />
                </tbody>
            </table>
        </div>
    );
};

export default ProductDescription;
