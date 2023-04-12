import axios from "axios";

const API = axios.create({
  baseURL: "https://vc3xdqdr66.execute-api.us-east-1.amazonaws.com/dev/",
});

export const getAPI = async (url: string, token: string | undefined) => {
  return await API.get(url, { headers: { Authorization: token } });
};
export const postAPI = async (url: string, data: LoginType | RegisterType | object | undefined) => {
  return await API.post(url, data);
};
