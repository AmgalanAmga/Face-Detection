import Cookies from "js-cookie";
import { postAPI, getAPI } from "../helpers/fetchData";
import { useNavigate } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import { useMainContext } from "../context/MainContext";
import { useAuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthContext();
  const { setLoading, setMessage, setError } = useMainContext();

  const login = async (data: LoginType) => {
    try {
      setLoading(true);
      const res: AxiosResponse = await postAPI("auth/login", data);
      setUser({ token: res.data?.token, user: res.data?.user });
      setLoading(false);
      navigate("/upload");
      Cookies.set("userToken", res.data?.token);
      localStorage.setItem("userLoggedIn", "true");
    } catch (error) {
      const err = error as AxiosError;
      setError({ msg: err.response?.data });
      setLoading(false);
      setTimeout(() => {
        setError({});
      }, 3000);
    }
  };

  const signup = async (data: RegisterType) => {
    try {
      setLoading(true);
      const res: AxiosResponse = await postAPI("auth/register", data);
      setLoading(false);
      setTimeout(() => {
        setMessage("");
        navigate("/auth/login");
      }, 3200);
      setMessage(res.data.msg);
    } catch (error) {
      const err = error as AxiosError;
      setError({ msg: err.response?.data });
      setLoading(false);
      setTimeout(() => {
        setError({});
      }, 3000);
    }
  };

  const refresh = async () => {
    try {
      setLoading(true);
      const token = Cookies.get("userToken");
      const res: AxiosResponse = await getAPI("auth/refresh", token);
      setUser({ token: res.data?.token, user: res.data?.user });
      setLoading(false);
      Cookies.set("userToken", res.data?.token);
    } catch (error) {
      const err = error as AxiosError;
      setError({ msg: err.response?.data });
      setLoading(false);
      setTimeout(() => {
        setError({});
      }, 3000);
    }
  };
  return { login, signup, refresh };
};
