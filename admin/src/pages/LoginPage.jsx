import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function LoginPage() {
  const navigate = useNavigate();
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });
  

  const submitHandler = async (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInput),
    })
      .then(async (response) => {
        if(!response.ok) {
          console.log(response)
          throw new Error(response.statusText)
        }
        return response.json();
      })
      .then((data) => {
        const access_token = data.access_token;
        localStorage.setItem("access_token", access_token);
        navigate("/");
      })
      .catch((err) => {
        const message = err.message;
        swal("Error", message, "error");
      });
  };

  return (
    <>
      <div className="login-form">
        <img
          className="logo-login"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxqaeHQWJID6iOqt52hA7qq9wxMMorcy580lufJh5rH5ZgVaNrIbivlFhFfPZGdc3MRdg&usqp=CAU"
          alt="Logo"
          width="100"
          height="100"
        />
        <h1 className="register-title">Sign in to your account</h1>
        <label for="email">Email address</label>
        <br />
        <input
          type="email"
          name="email"
          placeholder="Please enter your email address"
          value={loginInput.email}
          onChange={(e) => {
            setLoginInput({
              ...loginInput,
              email: e.target.value,
            });
          }}
        />
        <br />
        <br />
        <label for="password">Password</label>
        <br />
        <input 
        type="password" 
        name="password"
        placeholder="Please enter your password"
        value={loginInput.password}
                onChange={(e) => {
                  setLoginInput({
                    ...loginInput,
                    password: e.target.value,
                  });
                }}
        />
        <br />
        <br />
        <button onClick={submitHandler} className="submit-button">Submit</button>
      </div>
    </>
  );
}

export default LoginPage;
