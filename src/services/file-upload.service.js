// src/services/file-upload.service.js

import axios from "axios";

const api = axios.create({
  // make sure you use PORT = 5005 (the port where our server is running)
  baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005",
  // withCredentials: true // => you might need this option if using cookies and sessions
});

const errorHandler = (err) => {
  throw err;
};

const uploadImage = async (file) => {
  try {
    const res = await api.post("/api/user/upload", file);
    return res.data;
  } catch (err) {
    return errorHandler(err);
  }
};


export default uploadImage;
