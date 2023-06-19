import { PRODUCTS_FETCH_SUCCESS, DETAIL_FETCH_SUCCESS } from "./actionType";

function fetchProducts() {
    return (dispatch) => {
      fetch("https://sakurakoiweb.siriusoya.site/pub/products")
        .then((response) => {
          if (!response.ok) throw new Error("Internal Server Error");
          return response.json();
        })
        .then((data) => dispatch(productsFetchSuccess(data)))
        .catch((err) => console.log(err));
    };
  }
  
  function productsFetchSuccess(payload) {
    return {
      type: PRODUCTS_FETCH_SUCCESS,
      payload,
    };
  }

  function fetchDetail(productId) {
    return (dispatch) => {
      fetch(
        `https://sakurakoiweb.siriusoya.site/pub/products/${productId}`
      )
        .then((response) => {
          if (!response.ok) throw new Error("Internal Server Error");
          return response.json();
        })
        .then((data) => dispatch(detailFetchSuccess(data)))
        .catch((err) => console.log(err));
    };
  }
  
  function detailFetchSuccess(payload) {
    return {
      type: DETAIL_FETCH_SUCCESS,
      payload,
    };
  }
  
  export { fetchProducts, fetchDetail };
  