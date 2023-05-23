import { Fragment, useContext, useEffect, useState } from "react";
import UpdateUser from "../components/UpdateUser";
import { getUserAction } from "../utils/actions";
import { useParams } from "react-router-dom";
import AuthContext from "../store/authContext";
import { Link } from "react-router-dom";
import UpdatePassword from "../components/UpdatePassword";

const UserAccount = (props) => {
  // const [user, setUser] = useState();
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const { userId } = useParams();

  const authCtx = useContext(AuthContext);
  const user = authCtx.user;

  // get the user from userId
  useEffect(() => {
    const getUser = async () => {
      try {
        setIsPageLoaded(true);
        const { data } = await getUserAction(userId);
        console.log(data);

        authCtx.updateStoreUser(data.user);

        localStorage.setItem("user", JSON.stringify(data.user));
        setIsPageLoaded(false);
      } catch (err) {
        console.log(err);
        console.log(err.response.data.message);
      }
    };
    getUser();
  }, [userId]);

  // const handelUserUpdate = async (updateUserData) => {
  //   setUser(updateUserData);
  //   console.log("updated user in userAccount", user);
  // };

  // useEffect(() => {
  //   console.log("this is new user", user);
  // }, [user]);

  return (
    <Fragment>
      {!isPageLoaded && authCtx.user && authCtx.isAuthorize && (
        <main className="main">
          <div className="user-view">
            <nav className="user-view__menu">
              {user.role === "user" && (
                <ul className="side-nav">
                  <li className="side-nav--active">
                    <Link to="">Settings</Link>
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
              <UpdatePassword />
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
      {!authCtx.isAuthorize && (
        <main className="main">
          <div className="loading">
            <h1>You are not Login.Please login to access this page</h1>
          </div>
        </main>
      )}
    </Fragment>
  );
};

export default UserAccount;
