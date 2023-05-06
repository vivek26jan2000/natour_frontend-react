import "../css/style.css";
import defaultUserImg from "../img/users/default.jpg";
import logoImg from "../img/logo-white.png";

import { Link } from "react-router-dom";
import { Fragment, useContext, useEffect, useState } from "react";
import AuthContext from "../store/authContext";
import { getUserAction } from "../utils/actions";

const Navbar = (props) => {
  const [user, setUser] = useState(null);

  const authCtx = useContext(AuthContext);

  // useEffect(() => {
  //   setUser(authCtx.user);
  //   console.log(user);
  // }, [authCtx.user]);
  // get the user from userId
  useEffect(() => {
    const getUser = async () => {
      const storeUser = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");
      if (storeUser && token) {
        const { data } = await getUserAction(storeUser._id);
        console.log(data);
        setUser(data.user);
      }
      // authCtx.updateStoreUser(data.user);
    };
    getUser();
  }, [authCtx.isAuthorize]);

  return (
    <Fragment>
      <header className="header">
        <nav className="nav nav--tours">
          <Link to="/" className="nav__el">
            All tours
          </Link>
          {/* <form className="nav__search">
            <button className="nav__search-btn"></button>
            <input
              type="text"
              placeholder="Search tours"
              className="nav__search-input"
            />
          </form> */}
        </nav>
        <div className="header__logo">
          <img src={logoImg} alt="Natours logo" />
        </div>
        <nav className="nav nav--user">
          {authCtx.isAuthorize && user && (
            <>
              <a href="/" className="nav__el">
                My bookings
              </a>
              <Link to={`user/${user._id}`} className="nav__el">
                <img
                  src={require(`../img/users/${user.photo}`)}
                  className="nav__user-img"
                  alt="User"
                />
                <span>{user ? user.name.split(" ")[0] : ""}</span>
              </Link>
            </>
          )}

          {!authCtx.isAuthorize && (
            <>
              <Link to="signup" className="nav__el">
                <button className="nav__el nav__el--cta">Sign up</button>
              </Link>
              <Link to="login" className="nav__el">
                <button className="nav__el nav__el--cta">Login</button>
              </Link>
            </>
          )}
        </nav>
      </header>
    </Fragment>
  );
};

export default Navbar;
