export const API_URL = "https://vivek-natour-backend.onrender.com/api/v1/"; //Base Url
// export const API_URL = "http://localhost:3000/api/v1/";
export const loginUrl = () => {
  return API_URL + "users/login";
};

export const logoutUrl = () => {
  return API_URL + "logout";
};

export const signupUrl = () => {
  return API_URL + "users/signup";
};

export const getAllToursUrl = () => {
  return API_URL + "tours";
};

export const getTourUrl = (id) => {
  return API_URL + `tours/${id}`;
};

export const updateUserUrl = () => {
  return API_URL + "users/updateMe";
};

export const getUserUrl = (id) => {
  return API_URL + `users/currentUser/${id}`;
};

export const updateUserPasswordUrl = () => {
  return API_URL + "users/updateMyPassword";
};
export const getUserImgUrl = (imageId) => {
  return API_URL + `users/images/${imageId}`;
};
