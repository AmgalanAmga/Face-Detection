import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="w-full min-h-screen bg-backImage bg-no-repeat bg-cover bg-center">
      <div className="fixed top-1/2 -translate-y-1/2 left-28">
        <h2 className="textLinear">Attendance System</h2>
        <div className="flexItemCenter space-x-4 mt-4">
          <Link to={"/auth/login"} className="homeAuthBtn">
            Login
          </Link>
          <Link to={"/auth/signup"} className="homeAuthBtn">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};
