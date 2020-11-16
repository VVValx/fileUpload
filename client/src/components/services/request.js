import axios from "axios";

const request = {
  get: axios.get,
  post: axios.post,
  patch: axios.patch,
  put: axios.put,
};

export default request;
