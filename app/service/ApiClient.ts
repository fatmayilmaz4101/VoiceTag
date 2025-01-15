import axios from "axios";
const API_BASE_URL = "http://192.168.1.174:3030/api";

const ApiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 3000000,
});
export default ApiClient;
