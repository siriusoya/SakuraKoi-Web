import {
  CATEGORIES_FETCH_SUCCESS,
  PRODUCTS_FETCH_SUCCESS
} from './actionType.js'

function fetchProducts() {
    return (dispatch) => {
      fetch("https://sakurakoiweb.siriusoya.site/products", {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
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

  function fetchCategories() {
    return (dispatch) => {
      fetch("http://localhost:3000/categories", {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          if (!response.ok) throw new Error("Internal Server Error");
          return response.json();
        })
        .then((data) => dispatch(CategoriesFetchSuccess(data)))
        .catch((err) => console.log(err));
    };
  }
  
  function CategoriesFetchSuccess(payload) {
    return {
      type: CATEGORIES_FETCH_SUCCESS,
      payload,
    };
  }

  function deleteCategory(categoryId) {
    return (dispatch) => {
      fetch(
        `https://sakurakoiweb.siriusoya.site/categories/${categoryId}/delete`,
        {
          method: "DELETE",
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      )
        .then((response) => {
          if (!response.ok) throw new Error("Internal Server Error");
        })
        .then(() => dispatch(fetchCategories()))
        .catch((err) => console.log(err));
    };
  }

  function deleteProduct(productId) {
    return (dispatch) => {
      fetch(
        `https://sakurakoiweb.siriusoya.site/products/${productId}/delete`,
        {
          method: "DELETE",
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      )
        .then((response) => {
          if (!response.ok) throw new Error("Internal Server Error");
        })
        .then(() => dispatch(fetchProducts()))
        .catch((err) => console.log(err));
    };
  }

  function createCategory(name) {
    return (dispatch) => {
      fetch("https://sakurakoiweb.siriusoya.site/categories/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify({ name }),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Internal Server Error");
        })
        .then(() => dispatch(fetchCategories()))
        .catch((err) => console.log(err));
    };
  }
  
  function updateCategory(name, categoryId) {
    return (dispatch) => {
      fetch(
        `https://sakurakoiweb.siriusoya.site/${categoryId}/edit`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            access_token: localStorage.getItem("access_token"),
          },
          body: JSON.stringify({ name }),
        }
      )
        .then((response) => {
          if (!response.ok) throw new Error("Internal Server Error");
        })
        .then(() => dispatch(fetchCategories()))
        .catch((err) => console.log(err));
    };
  }

  function updateProduct(productData, productId) {
    return (dispatch) => {
      fetch(
        `https://sakurakoiweb.siriusoya.site/${productId}/edit`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            access_token: localStorage.getItem("access_token"),
          },
          body: JSON.stringify(productData),
        }
      )
        .then((response) => {
          if (!response.ok) throw new Error("Internal Server Error");
        })
        .then(() => dispatch(fetchProducts()))
        .catch((err) => console.log(err));
    };
  }

  function createProduct(productInput) {
    return (dispatch) => {
      fetch("https://sakurakoiweb.siriusoya.site/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(productInput),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Internal Server Error");
        })
        .then(() => dispatch(fetchProducts()))
        .catch((err) => console.log(err));
    };
  }

export {
  fetchProducts,
  fetchCategories,
  deleteCategory,
  deleteProduct,
  createCategory,
  updateCategory,
  updateProduct,
  createProduct
}