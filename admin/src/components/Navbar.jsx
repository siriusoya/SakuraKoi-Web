import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  function logoutHandler() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <>
      <div className="topnav">
        <div className="logo-navbar">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxqaeHQWJID6iOqt52hA7qq9wxMMorcy580lufJh5rH5ZgVaNrIbivlFhFfPZGdc3MRdg&usqp=CAU"
            alt="Logo"
            width="40"
            height="40"
          />
        </div>
        <div className="navbar-links">
          <NavLink
            to="/"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            <p>Dashboard</p>
          </NavLink>
          <NavLink
            to="/categories"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            <p>Categories</p>
          </NavLink>
          <NavLink
            to="/add-admin"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            <p>Register Admin</p>
          </NavLink>
          
          <p onClick={logoutHandler} >Sign Out</p>
        </div>
      </div>
    </>
  );
}

export default Navbar;
