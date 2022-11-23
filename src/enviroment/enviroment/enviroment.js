import axios from "axios";
const token = localStorage.getItem("userTK");
const tk = `Bearer ${token}`;

export const API = axios.create({
  // baseURL: `http://192.168.6.28/shogol-backend/api/`,
  // baseURL: `https://dev-shogol.lundev.online/Admin/api/`,
  // baseURL: `https://test-shogol.lundev.online/Admin/api/`,
  // baseURL: `https://uat-shogol.lundev.online/Admin/api/`,
  // baseURL: `https://shogol.sa/Admin/api/`,

  baseURL: `https://dev.shogol.sa/Admin/api/`,
  headers: {
    Authorization: tk.replaceAll('"', ""),
  },
  // baseURL: `https://shogol.sa/Admin/api/`,
  // baseURL: `https://test.shogol.sa/Admin/api/`,
  // baseURL: `https://uat.shogol.sa/Admin/api/`,
});
