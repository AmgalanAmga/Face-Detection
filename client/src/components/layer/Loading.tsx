import Lottie from "lottie-react";
import Hamster from "../../assets/Hamster.json";

export const Loading = () => {
  return (
    <div className="fixed inset-0 bg-white/70 perfectCenter flex-col">
      <div className="w-96 h-96">
        <Lottie animationData={Hamster} loop={true} />
      </div>
      <h3 className="text-3xl font-semibold">Hamster is loading...</h3>
    </div>
  );
};
