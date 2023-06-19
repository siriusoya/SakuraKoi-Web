import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function AddAdminPage() {
  const navigate = useNavigate();
  const [registerInput, setRegisterInput] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });

  function changeHandler(e) {
    const data = e.target.name;
    const value = e.target.value;
    const newData = {
      ...registerInput,
    };
    newData[data] = value;
    setRegisterInput(newData);
  }

  function submitHandler() {
    fetch("https://sakurakoiweb.siriusoya.site/add-admin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        access_token: localStorage.getItem("access_token"),
      },
      body: JSON.stringify(registerInput),
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (data.statusCode) {
        }
        navigate("/");
      })
      .catch((err) => {
        const message = err.message;
        swal("Error", message, "error");
      });
  }

  return (
    <>
      <div className="register-form">
        <h1 className="register-title">Register New Admin</h1>
        <label for="username">Username</label>
        <br />
        <input
          type="text"
          name="username"
          onChange={changeHandler}
          value={registerInput.username}
        />
        <br />
        <br />
        <label for="email">Email</label>
        <br />
        <input
          type="email"
          name="email"
          onChange={changeHandler}
          value={registerInput.email}
        />
        <br />
        <br />
        <label for="password">Password</label>
        <br />
        <input
          type="password"
          name="password"
          onChange={changeHandler}
          value={registerInput.password}
        />
        <br />
        <br />
        <label for="phoneNumber">Phone Number</label>
        <br />
        <input
          type="text"
          name="phoneNumber"
          onChange={changeHandler}
          value={registerInput.phoneNumber}
        />
        <br />
        <br />
        <label for="address">Address</label>
        <br />
        <input
          type="text"
          name="address"
          onChange={changeHandler}
          value={registerInput.address}
        />
        <br />
        <br />
        <button onClick={submitHandler} className="register-admin-button">
          Submit
        </button>
      </div>
    </>
  );
}

export default AddAdminPage;
