import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../store/actions";
import { useNavigate } from "react-router-dom";
import rupiahFormat from "../helpers/rupiahFormat";
import ShowImages from "./ShowImages";
import ProductForm from "./ProductForm";


function ProductRow(props) {
  const dispatch = useDispatch();
  const { product, index } = props;
  const [showImages, setShowImages] = useState(false);
  const [showEditProductForm, setShowEditProductForm] = useState(false);

  function deleteHandler(e, productId) {
    e.preventDefault();
    dispatch(deleteProduct(productId));
  }
  

  function openShowImages() {
    setShowImages(true);
  }
  function openShowEditProductForm() {
    setShowEditProductForm(true);
  }
  
  

  return (
    <>
      {showImages && <ShowImages product={product} key={product.id} stateChanger={setShowImages} />}
      {showEditProductForm && <ProductForm product={product} key={product.id} stateChanger={setShowEditProductForm} />}

      <tr>
        <td>{index}</td>
        <td>{product.name}</td>
        <td>{product.Category.name}</td>
        <td>{rupiahFormat(product.price)}</td>
        <td>{product.User.email}</td>
        <td>
          <img className="product-image-table" src={product.mainImg} />
        </td>
        <td>
          <button onClick={openShowImages}>Show Images</button>
        </td>
        <td>
          <button onClick={openShowEditProductForm}>Edit</button> <button onClick={(e) => deleteHandler(e, product.id)}>Delete</button>
        </td>
      </tr>
    </>
  );
}

export default ProductRow;
