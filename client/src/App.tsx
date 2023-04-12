import { useEffect } from "react";
import { Loading } from "./components";
import { useAuth } from "./hooks/useAuth";
import { Route, Routes } from "react-router-dom";
import { Home, Login, Signup, Upload } from "./pages";
import { useMainContext } from "./context/MainContext";
import { PrivateRoute } from "./helpers/PrivateRoute";

const App = () => {
  const { refresh } = useAuth();
  const { loading } = useMainContext();
  const userLogged = localStorage.getItem("userLoggedIn");

  useEffect(() => {
    (async () => {
      if (userLogged === "true") {
        await refresh();
      }
    })();
    //eslint-disable-next-line
  }, [userLogged]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route path="/upload" element={<Upload />} />
        </Route>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
      </Routes>
      {loading && <Loading />}
    </div>
  );
};

export default App;
