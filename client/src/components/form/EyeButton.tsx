import type { Dispatch, SetStateAction } from "react";
import { BsEyeSlashFill, BsEye } from "react-icons/bs";

type EyeButtonProps = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

export const EyeButton = ({ setVisible, visible }: EyeButtonProps) => {
  return (
    <span onClick={() => setVisible(!visible)} className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer">
      {visible ? <BsEyeSlashFill /> : <BsEye />}
    </span>
  );
};
