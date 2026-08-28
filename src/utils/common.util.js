import config from "../config";
import CryptoJS from "crypto-js";
import axios from "axios";

export const setLocalStorageToken = (token) => {
  localStorage.setItem(
    `${config.NAME_KEY}:token`,
    CryptoJS.AES.encrypt(token, `${config.NAME_KEY}-token`).toString()
  );
};

export const GetLocalStorageToken = () => {
  const token = localStorage.getItem(`${config.NAME_KEY}:token`);
  if (token) {
    const bytes = CryptoJS?.AES?.decrypt(token, `${config.NAME_KEY}-token`);
    return bytes?.toString(CryptoJS.enc.Utf8);
  }
  return false;
};

export const removeLocalStorageToken = (navigate) => {
  localStorage.removeItem(`${config.NAME_KEY}:token`);

  if (navigate) {
    navigate("/login");
  }
};

export const uploadImage = async (file, mediaType = "logo", mediaFor = "company") => {
  const formData = new FormData();
  formData.append("file", file);

  const url = `${config.API_BASE_URL}/media/upload/${mediaType}/${mediaFor}`;
  const response = await axios.post(url, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};