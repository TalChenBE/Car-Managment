import axios from "axios";
const BASE_URL = "https://car-management-back-end.vercel.app/api";
const TEST_URL = 'http://localhost:4000/api';

export default axios.create({
  baseURL: TEST_URL,
});

export const axiosPrivate = axios.create({
  baseURL: TEST_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
