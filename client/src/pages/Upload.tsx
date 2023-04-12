import Lottie from "lottie-react";
import Webcam from "react-webcam";
import { motion } from "framer-motion";
import { FiCamera } from "react-icons/fi";
import { useUpload } from "../hooks/useUpload";
import Attendance from "../assets/attendance.json";
import { convertIntoObject } from "../utils/convertIntoObject";
import { useRef, useState, useCallback, FormEvent } from "react";
import { UploadHeader, Success, AlreadyRegistered } from "../components";
import { useData } from "../hooks/useData";
import { object } from "yup";

export const Upload = () => {
  const { queryData } = useData();
  const { uploadDailyImage, uploadTargetImage } = useUpload();
  /* Refs */
  const webcamRef = useRef<Webcam>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  /* States */
  const [success, setSuccess] = useState<boolean>(false);
  const [capturedImg, setCapturedImg] = useState<any>("");
  const [onCamera, setOnCamera] = useState<boolean>(false);
  const [selectedImgUrl, setSelectedImgUrl] = useState<any>();
  const [alreadyReg, setAlreadyReg] = useState<boolean>(false);
  /* Functions */
  const takeAPic = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setCapturedImg(imageSrc);
  }, [webcamRef]);

  const successStatus = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setOnCamera(false);
      setCapturedImg("");
      setSelectedImgUrl(null);
    }, 3000);
  };

  const uploadToS3 = async () => {
    if (capturedImg) {
      const file = await convertIntoObject(capturedImg);
      await uploadTargetImage(file);
      successStatus();
    } else if (selectedImgUrl) {
      await uploadTargetImage(selectedImgUrl);
      successStatus();
    }
  };

  const registerAttendance = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await queryData();
    console.log(res);
    if (Object.keys(res.data).length > 0) {
      setCapturedImg("");
      setAlreadyReg(true);
      setOnCamera(false);
      setTimeout(() => {
        setAlreadyReg(false);
      }, 3000);
    } else {
      const file = await convertIntoObject(capturedImg);
      await uploadDailyImage(file);
      successStatus();
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#022D4A]">
      <UploadHeader
        inputRef={inputRef}
        onCamera={onCamera}
        setOnCamera={setOnCamera}
        setCapturedImg={setCapturedImg}
        selectedImgUrl={selectedImgUrl}
        setSelectedImgUrl={setSelectedImgUrl}
      />
      <form onSubmit={registerAttendance} className="flexColPerfect absoluteCenter">
        <input
          hidden
          type="file"
          ref={inputRef}
          accept="image/*"
          onChange={(e) => setSelectedImgUrl(e.target.files?.[0])}
        />
        <div className="relative container bg-white">
          {!onCamera && !selectedImgUrl && !capturedImg ? (
            <Lottie animationData={Attendance} loop={true} />
          ) : onCamera && !selectedImgUrl && !capturedImg ? (
            <>
              <Webcam
                mirrored={true}
                ref={webcamRef}
                screenshotQuality={1}
                screenshotFormat="image/jpeg"
                videoConstraints={{
                  width: 700,
                  height: 700,
                  facingMode: "user",
                }}
              />
              <button
                type="button"
                onClick={takeAPic}
                className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 bg-gray-300 hover:bg-gray-400 p-3 duration-200 rounded-full"
              >
                <FiCamera size={40} />
              </button>
            </>
          ) : (
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0.6, scale: 0.7 }}
              className="relative w-[700px] h-[700px] rounded-xl overflow-hidden"
            >
              {selectedImgUrl && !capturedImg && (
                <img
                  alt="selected"
                  className="w-full h-full object-fill"
                  src={URL.createObjectURL(selectedImgUrl as any)}
                />
              )}
              {!selectedImgUrl && capturedImg && <img src={capturedImg} alt="captured" />}
            </motion.div>
          )}
        </div>
        <div className="flex items-center space-x-4 mt-5">
          <button
            type="button"
            onClick={uploadToS3}
            className="button disabled:bg-gray-600"
            disabled={!capturedImg && !selectedImgUrl}
          >
            Save image
          </button>
          <button type="submit" disabled={!capturedImg} className="button disabled:bg-gray-600">
            Register
          </button>
        </div>
      </form>
      {success && <Success />}
      {alreadyReg && <AlreadyRegistered />}
    </div>
  );
};
