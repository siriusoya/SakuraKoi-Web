import { Link } from "react-router-dom";
import rupiahFormat from "../helpers/rupiahFormat";

function ProductCard(props) {
  const { product } = props;

    return (
        <>
        <Link
          to={`products/${product.id}`}
        >
        <div className="product">
          <div className="product-top">
            <h2 className="product-name product-content">{product.name}</h2>
            <p className="product-content product-price">{rupiahFormat(product.price)}</p>
          </div>
          <img
            className="product-image"
            src={product.mainImg}
          />
          <div className="product-category">
            <p className="product-content">{product.Category.name}</p>
          </div>
          <p className="product-content product-description">
          {product.description}
          </p>
        </div>
        </Link>
        </>
    )
}

export default ProductCard;