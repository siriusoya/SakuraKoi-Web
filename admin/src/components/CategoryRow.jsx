import React, { useState } from "react";
import { deleteCategory } from "../store/actions";
import { useDispatch } from "react-redux";
import CategoryForm from "./CategoryForm";

function CategoryRow(props) {
  const dispatch = useDispatch();
  const { category, index } = props;  
  const [showEditCategoryForm, setShowEditCategoryForm] = useState(false);

  function deleteHandler(e, categoryId) {
    e.preventDefault();
    dispatch(deleteCategory(categoryId));
  }

  function openShowEditCategoryForm() {
    setShowEditCategoryForm(true);
  }

  return (
    <>
    {showEditCategoryForm && <CategoryForm category={category} key={category.id} stateChanger={setShowEditCategoryForm} />}

      <tr>
        <td>{index}</td>
        <td>{category.name}</td>
        <td>{category.createdAt.slice(0, 10)}</td>
        <td>{category.updatedAt.slice(0, 10)}</td>
        <td>
          <button onClick={openShowEditCategoryForm}>Edit</button>{" "}
          <button onClick={(e) => deleteHandler(e, category.id)}>Delete</button>
        </td>
      </tr>
    </>
  );
}

export default CategoryRow;
