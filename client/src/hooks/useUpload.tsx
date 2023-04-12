import Cookies from "js-cookie";
import { getAPI } from "../helpers/fetchData";
import { AxiosError, AxiosResponse } from "axios";
import { useAuthContext } from "../context/AuthContext";
import { useMainContext } from "../context/MainContext";

export const useUpload = () => {
  const { user } = useAuthContext();
  const token = Cookies.get("userToken");
  const { setLoading, setError } = useMainContext();

  const uploadTargetImage = async (image: any) => {
    try {
      setLoading(true);
      const { data }: AxiosResponse = await getAPI(
        `upload/?bucket=studentsphotosbucket&fileKey=target/${user.user.userId}.jpeg`,
        token
      );
      await fetch(data.url, { method: "PUT", body: image });
      setLoading(false);
    } catch (error) {
      const err = error as AxiosError;
      setError({ msg: err.response?.data });
      setLoading(false);
    }
  };

  const uploadDailyImage = async (image: any) => {
    try {
      setLoading(true);
      const { data }: AxiosResponse = await getAPI(
        `upload/?bucket=studentsphotosbucket&fileKey=daily/${user.user.userId}.jpeg`,
        token
      );
      await fetch(data.url, { method: "PUT", body: image });
      setLoading(false);
    } catch (error) {
      const err = error as AxiosError;
      setError({ msg: err.response?.data });
      setLoading(false);
    }
  };
  
  return { uploadDailyImage, uploadTargetImage };
};
