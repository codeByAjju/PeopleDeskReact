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

export const extractApiList = (res, keys = []) => {
  const result = res?.data?.result ?? res?.data?.data ?? res?.data;
  if (Array.isArray(result)) return result;
  if (!result || typeof result !== "object") return [];
  for (const key of keys) {
    if (Array.isArray(result[key])) return result[key];
  }
  if (Array.isArray(result.rows)) return result.rows;
  if (Array.isArray(result.list)) return result.list;
  if (Array.isArray(result.items)) return result.items;
  return [];
};

export const extractApiItem = (res) =>
  res?.data?.result ?? res?.data?.data ?? res?.data ?? null;

export const getMasterLabel = (item) => {
  if (!item || typeof item !== "object") return "";
  return (
    item.name ||
    item.countryName ||
    item.stateName ||
    item.cityName ||
    item.title ||
    item.code ||
    [item.firstName, item.lastName].filter(Boolean).join(" ").trim() ||
    ""
  );
};

export const findMasterLabel = (list, id) => {
  if (id === null || id === undefined || id === "") return "";
  const match = (list || []).find((item) => String(item?.id) === String(id));
  return getMasterLabel(match);
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