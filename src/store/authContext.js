import { createContext, useEffect, useState } from "react";
import { getAllTourAction, getUserAction } from "../utils/actions";

const AuthContext = createContext({
  tours: [],
  isAuthorize: false,
  user: null,
  token: "",
  login: () => {},
  logout: () => {},
  updateStoreUser: (val) => {},
});

export const AuthContextProvider = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  const [tours, setTours] = useState([]);
  const [user, setUser] = useState();
  const [token, setToken] = useState();

  // sending request to server to get all tours
  useEffect(() => {
    const getAllToursRequest = async () => {
      const data = await getAllTourAction();
      setTours(data.data.data);
    };
    getAllToursRequest();
  }, []);

  // getting token and login user from  localStorage
  useEffect(() => {
    const storeToken = localStorage.getItem("token");
    const storeUser = JSON.parse(localStorage.getItem("user"));

    if (storeToken) {
      setIsLogin(true);
      setToken(storeToken);
    }
    if (storeUser) {
      setUser(storeUser);
    }
  }, [isLogin]);

  const loginHandler = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLogin(false);
  };

  // updating the user store in localstroage
  const updateUserHadler = async (userData) => {
    setUser((prevUser) => {
      return {
        ...prevUser,
        ...userData,
      };
    });
  };

  // get the current user
  useEffect(() => {
    const sendReq = async () => {
      const data = await getUserAction();
    };
  });

  const ctxObj = {
    tours: tours,
    isAuthorize: isLogin,
    token: token,
    user: user,
    updateStoreUser: updateUserHadler,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={ctxObj}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContext;
