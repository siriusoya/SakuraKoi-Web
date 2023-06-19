import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { fetchProducts } from "../store/actions";
import PulseLoader from "react-spinners/PulseLoader";
import ProductTable from "../components/ProductTable"
import ProductForm from "../components/ProductForm";

function DashboardPage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
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

  function openShowAddProductForm() {
    setShowAddProductForm(true);
  }

    return (
        <>
        { loading && <div className="pulseLoaderContainer">
          <PulseLoader
            loading={loading}
            size={20}
            color={"#d60101"}
            className="pulseLoader"
          />
        </div> }
        
        {showAddProductForm && <ProductForm stateChanger={setShowAddProductForm} />}

        <div className="dashboard-header">
        <div>
          <h2>Product List</h2>
        </div>
        <div className="add-product-button-cont">
          <button onClick={openShowAddProductForm} className="add-product-button">+ Create Product</button>
        </div>
      </div>
      <div className="dashboard-table">
      <ProductTable products={products} />
      </div>
        </>
    )
}

export default DashboardPage;