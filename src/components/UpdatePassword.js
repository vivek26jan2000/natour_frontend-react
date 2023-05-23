import { Fragment, useState } from "react";
import { updateUserPassword } from "../utils/actions";
import { useNavigate } from "react-router-dom";

const UpdatePassword = (props) => {
  const [inputCurrentPassword, setInputCurrentPassword] = useState("");
  const [inputNewPassword, setInputNewPassword] = useState("");
  const [inputConfirmPassword, setInputConfirmPassword] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const navigate = useNavigate();

  const inputCurrentPasswordHandler = (e) => {
    setInputCurrentPassword(e.target.value);
  };
  const inputNewPasswordHandler = (e) => {
    setInputNewPassword(e.target.value);
  };
  const inputConfirmPasswordHandler = (e) => {
    setInputConfirmPassword(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    const value = {
      currentPassword: inputCurrentPassword,
      newPassword: inputNewPassword,
      confirmPassword: inputConfirmPassword,
    };

    const token = localStorage.getItem("token");
    console.log(value);
    try {
      const data = await updateUserPassword(token, value);
      console.log(data);
      // show success alert
      setShowAlert(true);
      setShowError(false);
      setIsUpdating(false);

      // navigate
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (err) {
      console.log(err);
      // show alert error msg
      setErrorMsg(err.response.data.message);
      setShowAlert(true);
      setShowError(true);
      setIsUpdating(false);
    }
  };

  return (
    <Fragment>
      <div className="user-view__form-container">
        <h2 className="heading-secondary ma-bt-md">Password change</h2>
        <form className="form form-user-settings" onSubmit={submitHandler}>
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
              value={inputCurrentPassword}
              onChange={inputCurrentPasswordHandler}
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
              value={inputNewPassword}
              onChange={inputNewPasswordHandler}
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
              value={inputConfirmPassword}
              onChange={inputConfirmPasswordHandler}
            />
          </div>
          <div className="form__group right">
            <button className="btn btn--small btn--green">
              {" "}
              {isUpdating ? "Updating..." : "Save password"}
            </button>
          </div>
        </form>
      </div>
      {showAlert && !showError && (
        <div className="alert alert--success">
          Password Updated Successfully
        </div>
      )}
      {showAlert && showError && (
        <div className="alert alert--error">{errorMsg}</div>
      )}
    </Fragment>
  );
};

export default UpdatePassword;
