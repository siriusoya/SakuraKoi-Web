import React, { useState } from "react";
import { useDispatch } from "react-redux";

function ShowImages(props) {
  const { product, stateChanger } = props;


    return (
        <>
        <div className="modal-img">
          <div className="modal-img-content">
            <span className="close" onClick={() => stateChanger(false)}>&times;</span>
            <h4 className="modal-title">{product.name}</h4>
            <div className="modal-images-container">
              <img
                className="modal-main-img"
                src={product.mainImg}
              />
              <div className="modal-product-images">
                {product.Images?.map((image) => {
                    return <img
                    className="modal-product-img"
                    src={image.imgUrl}
                  />
                })}
                
              </div>
            </div>
          </div>
        </div>
        </>
    )
}

export default ShowImages;