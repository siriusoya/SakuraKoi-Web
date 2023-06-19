import { NavLink } from "react-router-dom";

function Navbar() {
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
          <p>Home</p>
          <NavLink
            to="/"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            <p>Products</p>
          </NavLink>
          <p>Inspiration</p>
          <p>Worldwide</p>
          <p>About Sakura</p>
        </div>
      </div>
    </>
  );
}

export default Navbar;
