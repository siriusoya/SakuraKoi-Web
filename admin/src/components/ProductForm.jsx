import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories, updateProduct, createProduct } from "../store/actions";

function ProductForm(props) {
  const { stateChanger, product } = props;
  const dispatch = useDispatch();
  const [formType, setFormType] = useState("add-form");
  const categories = useSelector((state) => {
    return state.category.data;
  });
  const [images, setImages] = useState([]);
  const [addImgOne, setAddImgOne] = useState({
    imgUrl: null,
  });
  const [addImgTwo, setAddImgTwo] = useState({
    imgUrl: null,
  });
  const [addImgThree, setAddImgThree] = useState({
    imgUrl: null,
  });
  const [addImgFour, setAddImgFour] = useState({
    imgUrl: null,
  });
  const [productInput, setProductInput] = useState({
    name: "",
    description: "",
    price: "",
    mainImg: "",
    CategoryId: "",
  });

  useEffect(() => {
    dispatch(fetchCategories());
    if (product) {
      setProductInput({
        name: product.name,
        description: product.description,
        price: product.price,
        mainImg: product.mainImg,
        CategoryId: product.CategoryId,
      });
      setFormType("edit-form");
      setImages(product.Images);
    }
  }, [product]);

  function imagesChangeHandler(e) {
    console.log(e);
    const index = e.target.name.substring(5);
    const value = e.target.value;
    const newData = [...images];
    newData[index].imgUrl = value;
    setImages(newData);
  }

  function submitHandler(e) {
    e.preventDefault();

    if (formType === "add-form") {
      const newData = [];
      if (addImgOne) {
        newData.push(addImgOne);
      }
      if (addImgTwo) {
        newData.push(addImgTwo);
      }
      if (addImgThree) {
        newData.push(addImgThree);
      }
      if (addImgFour) {
        newData.push(addImgFour);
      }

      const filteredImages = newData.filter((image) => image.imgUrl);

      const productData = {
        ...productInput,
        Images: filteredImages,
      };

      dispatch(createProduct(productData));
    } else if (formType === "edit-form") {
      const filteredImages = images.filter((image) => image.imgUrl);

      const productData = {
        ...productInput,
        Images: filteredImages,
      };

      dispatch(updateProduct(productData, product.id));
    }
    stateChanger(false);
  }

  return (
    <>
      <div className="modal">
        <div className="modal-content">
          <span onClick={() => stateChanger(false)} className="close">
            &times;
          </span>
          {formType == "add-form" && (
            <h4 className="modal-title">Create New Product</h4>
          )}
          {formType == "edit-form" && (
            <h4 className="modal-title">Edit Product</h4>
          )}
          <label for="name">Name</label>
          <br />
          <input
            className="modal-input"
            type="text"
            name="name"
            value={productInput.name}
            onChange={(e) => {
              setProductInput({
                ...productInput,
                name: e.target.value,
              });
            }}
          />
          <label for="description">Description</label>
          <br />
          <textarea
            className="modal-input"
            name="description"
            rows="2"
            cols="50"
            value={productInput.description}
            onChange={(e) => {
              setProductInput({
                ...productInput,
                description: e.target.value,
              });
            }}
          ></textarea>
          <label for="price">Price</label>
          <br />
          <input
            className="modal-input"
            type="number"
            name="price"
            value={productInput.price}
            onChange={(e) => {
              setProductInput({
                ...productInput,
                price: e.target.value,
              });
            }}
          />
          <label for="CategoryId">Category</label>
          <select 
          className="modal-input" 
          name="CategoryId"
          onChange={(e) => {
            setProductInput({
              ...productInput,
              CategoryId: e.target.value,
            });
          }}
          >
            {formType == "add-form" && (
              <option disabled selected hidden>
                Select Category
              </option>
            )}
            {formType == "edit-form" && (
              <option value={productInput.CategoryId} disabled selected hidden>
                {product.Category.name}
              </option>
            )}
            {categories.map((category) => {
              return <option
               value={category.id}
               >{category.name}</option>;
            })}
          </select>
          <label for="mainImg">Main Image URL</label>
          <br />
          <input
            className="modal-input"
            type="text"
            name="mainImg"
            value={productInput.mainImg}
            onChange={(e) => {
              setProductInput({
                ...productInput,
                mainImg: e.target.value,
              });
            }}
          />
          <br />
          <label for="image">Additional Images</label>
          <br />
          {formType == "add-form" && (
            <div>
              <input
                className="modal-image-input"
                type="text"
                name="image"
                value={addImgOne.imgUrl}
                onChange={(e) => {
                  setAddImgOne({
                    imgUrl: e.target.value,
                  });
                }}
              />
              <input
                className="modal-image-input"
                type="text"
                name="image"
                value={addImgTwo.imgUrl}
                onChange={(e) => {
                  setAddImgTwo({
                    imgUrl: e.target.value,
                  });
                }}
              />
              <input
                className="modal-image-input"
                type="text"
                name="image"
                value={addImgThree.imgUrl}
                onChange={(e) => {
                  setAddImgThree({
                    imgUrl: e.target.value,
                  });
                }}
              />
              <input
                className="modal-image-input"
                type="text"
                name="image"
                value={addImgFour.imgUrl}
                onChange={(e) => {
                  setAddImgFour({
                    imgUrl: e.target.value,
                  });
                }}
              />
            </div>
          )}
          {formType == "edit-form" && (
            <div>
              {images.map((image, index) => {
                return (
                  <input
                    key={index}
                    className="modal-image-input"
                    type="text"
                    id={`image${index}`}
                    name={`image${index}`}
                    value={image?.imgUrl}
                    onChange={imagesChangeHandler}
                  />
                );
              })}
            </div>
          )}

          <button onClick={submitHandler} className="submit-modal">
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductForm;
