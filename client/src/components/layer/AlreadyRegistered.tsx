import Lottie from "lottie-react";
import { scaleUp } from "../../utils";
import { motion } from "framer-motion";
import Tiger from "../../assets/tiger.json";

export const AlreadyRegistered = () => {
  return (
    <>
      <div className="fixed inset-0 bg-white/70" />
      <div className="absoluteCenter z-10">
        <motion.div variants={scaleUp} initial="initial" animate="animate" exit="exit" className="w-[500px] h-[500px]">
          <Lottie animationData={Tiger} loop={false} className="w-full h-full object-cover" />
          <h3 className="text-center text-3xl -mt-2">You have already registered.</h3>
        </motion.div>
      </div>
    </>
  );
};
