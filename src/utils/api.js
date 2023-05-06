export const API_URL = "http://localhost:3000/api/v1/"; //Base Url

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
