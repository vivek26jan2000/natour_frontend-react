import "../css/style.css";
import { Fragment, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { signupAction } from "../utils/actions";
import AuthContext from "../store/authContext";

const Signup = (props) => {
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputPasswordConfirm, setInputPasswordConfirm] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const inputNameHandler = (e) => {
    setInputName(e.target.value);
  };
  const inputEmailHandler = (e) => {
    setInputEmail(e.target.value);
  };
  const inputPasswordHandler = (e) => {
    setInputPassword(e.target.value);
  };
  const inputPasswordConfirmHandler = (e) => {
    setInputPasswordConfirm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // access the values of input fields here
    const value = {
      name: inputName,
      email: inputEmail,
      password: inputPassword,
      passwordConfirm: inputPasswordConfirm,
    };
    try {
      const { data } = await signupAction(value);
      console.log(data);
      localStorage.setItem("user", JSON.stringify(data.user));
      // clean the input feilds
      setInputEmail("");
      setInputName("");
      setInputPassword("");
      setInputPasswordConfirm("");

      // show success alert
      setShowAlert(true);
      setShowError(false);

      // LOGIN IN THE USER
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
          <h2 className="heading-secondary ma-bt-lg">Create New Account</h2>
          <form className="form form--login" onSubmit={handleSubmit}>
            <div className="form__group">
              <label className="form__label" htmlFor="name">
                Name
              </label>
              <input
                className="form__input"
                id="name"
                type="text"
                placeholder="John Doe"
                required="required"
                value={inputName}
                onChange={inputNameHandler}
              />
            </div>
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
            <div className="form__group ma-bt-md">
              <label className="form__label" htmlFor="passwordConfirm">
                passwordConfirm
              </label>
              <input
                className="form__input"
                id="passwordConfirm"
                type="password"
                placeholder="••••••••"
                required="required"
                minLength="8"
                value={inputPasswordConfirm}
                onChange={inputPasswordConfirmHandler}
              />
            </div>
            <div className="form__group">
              <button
                type="primary"
                htmltype="submit"
                className="btn btn--green">
                Signup
              </button>
            </div>
          </form>
        </div>
      </main>

      {showAlert && !showError && (
        <div className="alert alert--success">Signup in Successfully</div>
      )}
      {showAlert && showError && (
        <div className="alert alert--error">{errorMsg}</div>
      )}
    </Fragment>
  );
};

export default Signup;
