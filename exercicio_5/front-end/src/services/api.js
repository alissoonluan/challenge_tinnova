import axios from "axios";
import { notify } from "./../utils/notify";

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    //Erro de conexão
    if (error.message && error.message === "Network Error") {
      notify(
        "Não foi possível estabelecer uma conexão com o servidor. Verifique sua internet e tente novamente."
      );
      return Promise.reject(error);
    }

    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedError && !axios.isCancel(error)) {
      notify("Um erro inesperado aconteceu.");
    }
    return Promise.reject(error);
  }
);

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.defaults.timeout = 1 * 60 * 60 * 10000000;

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  baseURL: axios.defaults.baseURL,
};
