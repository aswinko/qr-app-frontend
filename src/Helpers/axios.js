import axios from "axios";
import { API } from "../urlConfig";
import { authConstants } from "../Actions/constants";
import store from "../Store";

const token = window.localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: API,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

axiosInstance.interceptors.request.use((req) => {
  const { auth } = store.getState();
  if (auth.token) {
    req.headers.Authorization = `Bearer ${auth.token}`;
  }
  return req;
});

axiosInstance.interceptors.request.use(
  (res) => {
    return res;
  },
  (error) => {
    console.log(error.response);
    const status  = error.response ? error.reponse.status : 500;
    if (status && status === 500) {
        localStorage.clear();
      store.dispatch({ type: authConstants.LOGOUT_SUCCESS });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
