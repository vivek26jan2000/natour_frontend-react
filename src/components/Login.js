import { Fragment, useState, useContext } from "react";
import { loginAction } from "../utils/actions";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/authContext";

const Login = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const inputEmailHandler = (e) => {
    setInputEmail(e.target.value);
  };
  const inputPasswordHandler = (e) => {
    setInputPassword(e.target.value);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    const email = inputEmail;
    const password = inputPassword;
    try {
      const data = await loginAction(email, password);

      console.log(data);

      // show success alert
      setShowAlert(true);
      setShowError(false);

      // login in the  user
      authCtx.login();

      // navigate to home page
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      // show alert error msg
      setErrorMsg(err.response.data.message);
      setShowAlert(true);
      setShowError(true);
    }
  };
  return (
    <Fragment>
      <main className="main">
        <div className="login-form">
          <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
          <form className="form form--login" onSubmit={loginHandler}>
            <div className="form__group">
              <label className="form__label" htmlFor="email">
                Email address
              </label>
              <input
                className="form__input"
                id="email"
                type="email"
                placeholder="you@example.com"
                required="required"
                value={inputEmail}
                onChange={inputEmailHandler}
              />
            </div>
            <div className="form__group ma-bt-md">
              <label className="form__label" htmlFor="password">
                Password
              </label>
              <input
                className="form__input"
                id="password"
                type="password"
                placeholder="••••••••"
                required="required"
                minLength="8"
                value={inputPassword}
                onChange={inputPasswordHandler}
              />
            </div>
            <div className="form__group">
              <button
                className="btn btn--green"
                type="primary"
                htmltype="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </main>
      {showAlert && !showError && (
        <div className="alert alert--success">Login in Successfully</div>
      )}
      {showAlert && showError && (
        <div className="alert alert--error">{errorMsg}</div>
      )}
    </Fragment>
  );
};

export default Login;
