import ProductCard from "../components/ProductCard";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../store/actions/index";
import PulseLoader from "react-spinners/PulseLoader";

function ProductsPage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const products = useSelector((state) => {
    return state.product.data;
  });

  useEffect(() => {
    dispatch(fetchProducts());
    setLoading(true);
  }, [dispatch]);

  useEffect(() => {
    if (products.length) {
      setLoading(false);
    }
  }, [products]);

  return (
    <>
      <div className="header-container">
        <img
          className="header-image"
          src="https://www.craypas.com/global/wp-content/themes/sakuracraypas/images/home/mv_copy.png"
        />
        <p>
          We are a manufacturer of art materials and tools with over 100 years
          of history, supporting your creative activities through the ages.
        </p>
      </div>

      <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
      <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>

      <h1 className="page-title">Products</h1>

      <div className="categories-container">
        <div className="search-categories">
          <h3>Refine Search :</h3>
          <h3 className="category-dummy">Brand</h3>
          <h3 className="category-dummy">Art Style</h3>
          <div className="products-dummy">
            <h3 className="category-dummy">Products</h3>
          </div>
        </div>

        <div className="category-list-container">
          <div className="category-list">
            <p className="category-name">Fineliners</p>
          </div>
          <div className="category-list">
            <p className="category-name">Brush Pens</p>
          </div>
          <div className="category-list">
            <p className="category-name">Markers</p>
          </div>
          <div className="category-list">
            <p className="category-name">Watercolors</p>
          </div>
        </div>
      </div>

      <div className="products-container">
      { loading && <div className="pulseLoaderContainer">
          <PulseLoader
            loading={loading}
            size={20}
            color={"#d60101"}
            className="pulseLoader"
          />
        </div> }
        { products.map((product) => {
          return <ProductCard product={product} key={product.id} />;
        }) }
      </div>
    </>
  );
}

export default ProductsPage;
