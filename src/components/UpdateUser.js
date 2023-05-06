import { useContext, useEffect, useState } from "react";
import defaultUserImg from "../img/users/default.jpg";
import { updateUserAction } from "../utils/actions";
import AuthContext from "../store/authContext";
import { useNavigate } from "react-router-dom";

const UpdateUser = (props) => {
  const [photo, setPhoto] = useState();
  const [imageUrl, setImageUrl] = useState(null);
  const [inputName, setInputName] = useState(props.user.name);
  const [inputEmail, setInputEmail] = useState(props.user.email);
  const [isUpdating, setIsUpdating] = useState(false);

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (photo) {
      setImageUrl(URL.createObjectURL(photo));
    }
  }, [photo]);

  const inputNameHandler = (e) => {
    setInputName(e.target.value);
  };
  const inputEmailHandler = (e) => {
    setInputEmail(e.target.value);
  };
  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    const formData = new FormData(e.target);
    const userData = {
      name: formData.get("name"),
      email: formData.get("email"),
    };
    if (photo) {
      userData.photo = photo.name;
    }
    console.log(userData);
    const token = localStorage.getItem("token");
    if (token) {
      const { data } = await updateUserAction(token, userData);
      console.log(data.user);
      setIsUpdating(false);
      setTimeout(() => {
        navigate("/");
      }, 500);
      setIsUpdating(false);
      // authCtx.updateStoreUser(data.user);
    }
  };

  return (
    <div className="user-view__form-container">
      <h2 className="heading-secondary ma-bt-md">Your account settings</h2>
      <form className="form form-user-data" onSubmit={submitHandler}>
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
          {photo && imageUrl && (
            <img className="form__user-photo" src={imageUrl} alt="User " />
          )}{" "}
          {!photo && !imageUrl && (
            <img
              className="form__user-photo"
              src={
                props.user.photo
                  ? require(`../img/users/${props.user.photo}`)
                  : defaultUserImg
              }
              alt="User "
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
  );
};

export default UpdateUser;
