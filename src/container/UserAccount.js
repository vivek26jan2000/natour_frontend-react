import { Fragment, useContext, useEffect, useState } from "react";
import UpdateUser from "../components/UpdateUser";
import { getUserAction } from "../utils/actions";
import { useParams } from "react-router-dom";
import AuthContext from "../store/authContext";
import { Link } from "react-router-dom";

const UserAccount = (props) => {
  const [user, setUser] = useState();
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const { userId } = useParams();

  const authCtx = useContext(AuthContext);

  // get the user from userId
  useEffect(() => {
    const getUser = async () => {
      setIsPageLoaded(true);
      const { data } = await getUserAction(userId);
      console.log(data);
      setUser(data.user);
      // authCtx.updateStoreUser(data.user);
      setIsPageLoaded(false);
    };
    getUser();
  }, []);

  return (
    <Fragment>
      {!isPageLoaded && user && (
        <main className="main">
          <div className="user-view">
            <nav className="user-view__menu">
              {user.role === "user" && (
                <ul className="side-nav">
                  <li className="side-nav--active">
                    <Link to={`user/${userId}`}>Settings</Link>
                  </li>
                  <li>
                    <a href="/">My bookings</a>
                  </li>
                  <li>
                    <a href="/">My reviews</a>
                  </li>
                  <li>
                    <a href="/">Billing</a>
                  </li>
                </ul>
              )}

              {user.role === "admin" && (
                <div className="admin-nav">
                  <h5 className="admin-nav__heading">Admin</h5>
                  <ul className="side-nav">
                    <li>
                      <a href="/">Manage tours</a>
                    </li>
                    <li>
                      <a href="/">Manage users</a>
                    </li>
                    <li>
                      <a href="/">Manage reviews</a>
                    </li>
                  </ul>
                </div>
              )}
            </nav>
            <div className="user-view__content">
              <UpdateUser user={user} />
              <div className="line">&nbsp;</div>
              <div className="user-view__form-container">
                <h2 className="heading-secondary ma-bt-md">Password change</h2>
                <form className="form form-user-settings">
                  <div className="form__group">
                    <label className="form__label" htmlFor="password-current">
                      Current password
                    </label>
                    <input
                      className="form__input"
                      id="password-current"
                      type="password"
                      placeholder="••••••••"
                      required="required"
                      minLength="8"
                    />
                  </div>
                  <div className="form__group">
                    <label className="form__label" htmlFor="password">
                      New password
                    </label>
                    <input
                      className="form__input"
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      required="required"
                      minLength="8"
                    />
                  </div>
                  <div className="form__group ma-bt-lg">
                    <label className="form__label" htmlFor="password-confirm">
                      Confirm password
                    </label>
                    <input
                      className="form__input"
                      id="password-confirm"
                      type="password"
                      placeholder="••••••••"
                      required="required"
                      minLength="8"
                    />
                  </div>
                  <div className="form__group right">
                    <button className="btn btn--small btn--green">
                      Save password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      )}
      {isPageLoaded && (
        <main className="main">
          <div className="loading">
            <h1>Loading...</h1>
          </div>
        </main>
      )}
    </Fragment>
  );
};

export default UserAccount;
