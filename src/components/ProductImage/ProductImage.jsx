const ProductImage = ({ imgUrl, model }) => {
    return (
        <div className="product__details__pic">
            <div className="product__details__slider__content">
                <img
                    className="product__big__img img-fluid w-100"
                    src={imgUrl}
                    alt={model}
                />
            </div>
        </div>
    );
};

export default ProductImage;
