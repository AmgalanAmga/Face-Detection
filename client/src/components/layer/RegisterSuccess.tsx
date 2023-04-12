import Lottie from "lottie-react";
import { scaleUp } from "../../utils";
import { motion } from "framer-motion";
import Register from "../../assets/registerSuccess.json";

export const RegisterSuccess = () => {
  return (
    <>
      <div className="fixed inset-0 bg-white/70" />
      <div className="absoluteCenter z-10">
        <motion.div variants={scaleUp} initial="initial" animate="animate" exit="exit" className="w-[500px] h-[500px]">
          <Lottie animationData={Register} loop={false} className="w-full h-full object-cover" />
        </motion.div>
      </div>
    </>
  );
};
