import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Dispatch, RefObject, SetStateAction } from "react";

type UploadHeaderProps = {
  onCamera: boolean;
  selectedImgUrl: any;
  inputRef: RefObject<HTMLInputElement>;
  setCapturedImg: Dispatch<SetStateAction<any>>;
  setOnCamera: Dispatch<SetStateAction<boolean>>;
  setSelectedImgUrl: Dispatch<SetStateAction<any>>;
};

export const UploadHeader = ({
  inputRef,
  onCamera,
  setOnCamera,
  selectedImgUrl,
  setCapturedImg,
  setSelectedImgUrl,
}: UploadHeaderProps) => {
  const navigate = useNavigate();
  const registerAttendance = () => {
    if (!onCamera) {
      setOnCamera(true);
      setSelectedImgUrl(undefined);
    } else {
      setOnCamera(false);
      setCapturedImg("");
      setSelectedImgUrl(undefined);
    }
  };

  const selectImage = () => {
    if (onCamera) {
      setOnCamera(false);
      setCapturedImg("");
      setSelectedImgUrl("");
      inputRef.current?.click();
    } else if (selectedImgUrl) {
      setSelectedImgUrl("");
    } else {
      inputRef.current?.click();
    }
  };

  const logout = () => {
    navigate("/");
    Cookies.remove("userToken");
    localStorage.setItem("userLoggedIn", "false");
  };

  return (
    <div className="flex items-center justify-between px-20 pt-5">
      <div className="w-20" />
      <div className="flex justify-center space-x-5 w-[600px]">
        <button type="button" onClick={registerAttendance} className="button">
          {onCamera ? "Cancel" : "Camera"}
        </button>
        <button type="button" onClick={selectImage} className="button">
          {selectedImgUrl ? "Cancel" : "Select image"}
        </button>
      </div>
      <button type="button" onClick={logout} className="button">
        Logout
      </button>
    </div>
  );
};
