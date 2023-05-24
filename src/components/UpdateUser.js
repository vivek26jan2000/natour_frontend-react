import { Fragment, useContext, useEffect, useState } from "react";
import defaultUserImg from "../img/users/default.jpg";
import { updateUserAction, getUserImgAction } from "../utils/actions";
import AuthContext from "../store/authContext";
import { useNavigate } from "react-router-dom";

const UpdateUser = (props) => {
  const [photo, setPhoto] = useState();

  const [inputName, setInputName] = useState(props.user.name);
  const [inputEmail, setInputEmail] = useState(props.user.email);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [userImg, setUserImg] = useState();

  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  // get the user image from the database
  useEffect(() => {
    const getImg = async () => {
      if (authCtx.user) {
        const imageUrl = await getUserImgAction(authCtx.user.photo);

        setUserImg(imageUrl);
      }
    };
    getImg();
  }, [authCtx.user]);

  const inputNameHandler = (e) => {
    setInputName(e.target.value);
  };
  const inputEmailHandler = (e) => {
    setInputEmail(e.target.value);
  };
  const handlePhotoChange = (e) => {
    const selectedFile = e.target.files[0];
    setPhoto(selectedFile);
    setSelectedFileName(selectedFile.name);

    // Display the selected image preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setIsUpdating(true);
    const formData = new FormData(e.target);
    const userData = {
      name: formData.get("name"),
      email: formData.get("email"),
    };
    if (photo) {
      userData.photo = formData.get("photo");
    }

    const sendReq = async () => {
      const token = localStorage.getItem("token");
      try {
        const data = await updateUserAction(token, userData);
        if (data.status === "success") {
          authCtx.updateStoreUser(data.data.user);

          // saving the user to data base
          localStorage.setItem("user", JSON.stringify(data.data.user));

          // show success alert
          setShowAlert(true);
          setShowError(false);
          setIsUpdating(false);

          // navigate
          setTimeout(() => {
            navigate("/");
          }, 500);
        }
      } catch (err) {
        console.log(err);
        // show alert error msg
        setErrorMsg(err.response.data.message);
        setShowAlert(true);
        setShowError(true);
        setIsUpdating(false);
      }
    };

    sendReq();
  };

  return (
    <Fragment>
      <div className="user-view__form-container">
        <h2 className="heading-secondary ma-bt-md">Your account settings</h2>
        <form
          className="form form-user-data"
          onSubmit={submitHandler}
          encType="multipart/form-data">
          <div className="form__group">
            <label className="form__label" htmlFor="name">
              Name
            </label>
            <input
              className="form__input"
              id="name"
              type="text"
              value={inputName}
              required="required"
              name="name"
              onChange={inputNameHandler}
            />
          </div>
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="email">
              Email address
            </label>
            <input
              className="form__input"
              id="email"
              type="email"
              value={inputEmail}
              onChange={inputEmailHandler}
              required="required"
              name="email"
            />
          </div>
          <div className="form__group form__photo-upload">
            {!previewImage && (
              <img
                className="form__user-photo"
                src={userImg ? userImg : defaultUserImg}
                alt="User "
              />
            )}
            {previewImage && (
              <img
                className="form__user-photo"
                src={previewImage}
                alt="Preview"
              />
            )}
            <input
              type="file"
              accept="image/*"
              id="photo"
              name="photo"
              onChange={handlePhotoChange}
            />
            <label className="btn__photo" htmlFor="photo">
              Choose new photo
            </label>
          </div>
          <div className="form__group right">
            <button className="btn btn--small btn--green">
              {isUpdating ? "Updating..." : "Save settings"}
            </button>
          </div>
        </form>
      </div>
      {showAlert && !showError && (
        <div className="alert alert--success">
          User Settings Save Successfully
        </div>
      )}
      {showAlert && showError && (
        <div className="alert alert--error">{errorMsg}</div>
      )}
    </Fragment>
  );
};

export default UpdateUser;
