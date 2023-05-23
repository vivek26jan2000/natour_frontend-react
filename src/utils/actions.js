import {
  loginUrl,
  signupUrl,
  getAllToursUrl,
  getTourUrl,
  updateUserUrl,
  getUserUrl,
  updateUserPasswordUrl,
  getUserImgUrl,
} from "./api";
import axios from "axios";

export const loginAction = async (email, password) => {
  const response = await axios.post(loginUrl(), {
    email,
    password,
  });

  if (response.data.status === "success") {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.data.user));
  }

  return response.data;
};

export const signupAction = async (value) => {
  const response = await axios.post(signupUrl(), {
    name: value.name,
    email: value.email,
    password: value.password,
    passwordConfirm: value.passwordConfirm,
  });

  if (response.data.status === "success") {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.data.user));
  }

  return response.data;
};

export const getAllTourAction = async () => {
  const response = await axios.get(getAllToursUrl());

  return response.data;
};

export const getTourAction = async (id) => {
  const response = await axios.get(getTourUrl(id));
  return response.data;
};

export const updateUserAction = async (token, userData) => {
  const response = await axios.patch(
    updateUserUrl(),
    {
      ...userData,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const getUserAction = async (id) => {
  const { data } = await axios.get(getUserUrl(id));
  return data;
};

export const updateUserPassword = async (token, value) => {
  const { data } = await axios.patch(
    updateUserPasswordUrl(),
    {
      password: value.newPassword,
      passwordCurrent: value.currentPassword,
      passwordConfirm: value.confirmPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const getUserImgAction = async (imageId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(getUserImgUrl(imageId), {
      responseType: "arraybuffer",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const imageBlob = new Blob([response.data], {
      type: response.headers["content-type"],
    });
    const imageUrl = URL.createObjectURL(imageBlob);
    return imageUrl;
  } catch (err) {
    console.log(err);
  }
};
