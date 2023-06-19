import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDetail } from "../store/actions";
import rupiahFormat from "../helpers/rupiahFormat";
import PulseLoader from "react-spinners/PulseLoader";


function DetailPage() {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const [loading, setLoading] = useState(false);
  const productDetail = useSelector((state) => {
    return state.detail.data;
  });

  useEffect(() => {
    dispatch(fetchDetail(productId));
    setLoading(true);
  }, [dispatch]);

  useEffect(() => {
    if (productDetail) {
      if (Object.keys(productDetail).length) {
        setLoading(false);
      }
    }
  }, [productDetail]);


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

      <section className="detail-section">
        <h1 className="detail-name">{productDetail.name}</h1>
        <p className="detail-price">{rupiahFormat(productDetail.price)}</p>
        <div className="detail-images-container">
          <img
            className="detail-main-img"
            src={productDetail.mainImg}
          />
          <div className="detail-product-images">
          { productDetail.Images?.map((image) => {
            return <img
              className="detail-product-img"
              src={image.imgUrl}
            />
          }) }
          </div>
        </div>
        <div className="detail-category-container">
          <p>{ productDetail.Category?.name }</p>
        </div>
        <p className="detail-description">
        { productDetail.description }
        </p>
        <p className="detail-author">added by: { productDetail.User?.email }</p>
      </section>
    </>
  );
}

export default DetailPage;
