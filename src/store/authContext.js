import { createContext, useEffect, useState } from "react";
import { getAllTourAction } from "../utils/actions";

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

  // getting token from  localStorage
  useEffect(() => {
    const storeToken = localStorage.getItem("token");
    const storeUser = localStorage.getItem("user");
    if (storeToken) {
      setIsLogin(true);
      setToken(storeToken);
    } else {
      setIsLogin(false);
    }
    if (storeUser) {
      setUser(JSON.parse(storeUser));
    }
    if (!storeUser) {
      setIsLogin(false);
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

  // updating the user
  const updateUserHadler = async (userData) => {
    setUser(userData);
    console.log(user);
  };

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
