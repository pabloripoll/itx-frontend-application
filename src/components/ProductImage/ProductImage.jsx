const ProductImage = ({ imgUrl, model }) => {
    return (
        <div className="d-flex justify-content-center align-items-center h-100">
            <img
                src={imgUrl}
                alt={model}
                className="img-fluid"
                style={{ maxHeight: '500px', objectFit: 'contain' }}
            />
        </div>
    );
};

export default ProductImage;
