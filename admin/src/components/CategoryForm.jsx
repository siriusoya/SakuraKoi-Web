import React, { useEffect, useState } from "react";
import { createCategory, updateCategory } from "../store/actions";
import { useDispatch } from "react-redux";

function CategoryForm(props) {
  const { stateChanger, category } = props;
  const dispatch = useDispatch();
  const [formType, setFormType] = useState('add-form');
  const [formInput, setFormInput] = useState({
    name: "",
  });

  useEffect(() => {
    if(category) {
      setFormInput({
        name: category.name
      });
      setFormType('edit-form')
    }
  }, []);

  function submitHandler(e) {
    e.preventDefault();
    if (formType === "add-form") {
      dispatch(createCategory(formInput.name));
    } else if (formType === "edit-form") {
      dispatch(updateCategory(formInput.name, category.id));
    }
    stateChanger(false);
  }

    return (
        <>
        <div className="modal">
        <div className="modal-content">
          <span onClick={() => stateChanger(false)} className="close">&times;</span>
          {formType == 'add-form' && <h4 className="modal-title">Create New Category</h4>}
          {formType == 'edit-form' && <h4 className="modal-title">Edit Category</h4>}
          <label for="name">Category Name</label><br />
          <input 
          className="modal-input" 
          type="text" 
          name="name" 
          value={formInput.name}
          onChange={(e) => {
            setFormInput({
              ...formInput,
              name: e.target.value,
            });
          }}
           />
          <button onClick={submitHandler} className="submit-modal">Submit</button>
        </div>
      </div>
        </>
    )
}

export default CategoryForm;