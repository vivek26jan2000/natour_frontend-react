import "../css/style.css";
import defaultUserImg from "../img/users/default.jpg";
import logoImg from "../img/logo-white.png";

import { Link } from "react-router-dom";
import { Fragment, useContext, useEffect, useState } from "react";
import AuthContext from "../store/authContext";
import { getUserAction, getUserImgAction } from "../utils/actions";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const [userImg, setUserImg] = useState();

  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const user = authCtx.user;

  useEffect(() => {
    const getImg = async () => {
      if (user) {
        const imageUrl = await getUserImgAction(user.photo);

        setUserImg(imageUrl);
      }
    };
    getImg();
  }, [user]);

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
                <img src={userImg} className="nav__user-img" alt="User" />
                <span>{user ? user.name.split(" ")[0] : ""}</span>
              </Link>
              <button
                className="nav__el"
                onClick={() => {
                  authCtx.logout();
                  navigate("/");
                }}>
                LogOut
              </button>
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
