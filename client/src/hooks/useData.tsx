import Cookies from "js-cookie";
import { getAPI } from "../helpers/fetchData";
import { AxiosError, AxiosResponse } from "axios";
import { useAuthContext } from "../context/AuthContext";
import { useMainContext } from "../context/MainContext";

export const useData = () => {
  const { user } = useAuthContext();
  const token = Cookies.get("userToken");
  const { setLoading, setError } = useMainContext();
  const queryData = async () => {
    try {
      setLoading(true);
      const { data }: AxiosResponse = await getAPI(`scanAttendance/?userId=${user.user.userId}`, token);
      setLoading(false);
      return data;
    } catch (error) {
      const err = error as AxiosError;
      setError({ msg: err.response?.data });
      setLoading(false);
    }
  };
  return { queryData };
};
