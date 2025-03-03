import PropTypes from "prop-types";

export default function Product({ productData }) {
  // TODO: Fetch the image on product load.
  return (
    <li className="meal-item">
      <article>
        <img
          src={`http://localhost:3000/${productData.image}`}
          alt={productData.image}
        ></img>
        <div>
          {" "}
          <h3>{productData.name}</h3>
          <p className="meal-item-price">${productData.price}</p>
          <div className="meal-item-description">{productData.description}</div>
          <button type="button" className="meal-item-actions button">
            Add to Cart
          </button>
        </div>
      </article>
    </li>
  );
}

Product.propTypes = {
  productData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired, // Consider changing this to number if it's numerical
  }).isRequired,
};
