import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { fetchCategories } from "../store/actions";
import PulseLoader from "react-spinners/PulseLoader";
import CategoryTable from "../components/CategoryTable"
import CategoryForm from "../components/CategoryForm";


function CategoriesPage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const categories = useSelector((state) => {
    return state.category.data;
  });

  useEffect(() => {
    dispatch(fetchCategories());
    setLoading(true);
    console.log(categories)
  }, []);

  useEffect(() => {
    if (categories.length) {
      setLoading(false);
    }
  }, []);

  function openShowAddCategoryForm() {
    setShowAddCategoryForm(true);
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

        {showAddCategoryForm && <CategoryForm stateChanger={setShowAddCategoryForm} />}

        <div className="dashboard-header">
        <div>
          <h2>Category List</h2>
        </div>
        <div className="add-category-button-cont">
          <button onClick={openShowAddCategoryForm}>+ Create Category</button>
        </div>
      </div>
      <div className="dashboard-table">
        <CategoryTable categories={categories} />
      </div>
        </>
    )
}

export default CategoriesPage;