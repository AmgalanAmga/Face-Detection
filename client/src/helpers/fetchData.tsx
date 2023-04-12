import axios from "axios";

const API = axios.create({
  baseURL: "https://ldyu7hkm73.execute-api.us-east-1.amazonaws.com/dev/",
});

export const getAPI = async (url: string, token: string | undefined) => {
  return await API.get(url, { headers: { Authorization: token } });
};
export const postAPI = async (url: string, data: LoginType | RegisterType | object | undefined) => {
  return await API.post(url, data);
};
