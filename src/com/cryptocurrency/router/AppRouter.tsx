import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Route, Routes } from "react-router-dom";
import { privateRoutes } from "./routes";
import RegPage from "../page/RegPage";
import LoginPage from "../page/LoginPage";
import MainPage from "../page/MainPage";
import CoinPage from "../page/CoinPage";
import PortfolioPage from "../page/PortfolioPage";
import FavoritesPage from "../page/FavoritePage";
import ProfilePage from "../page/ProfilePage";
import UsersPage from "../page/UsersPage";

interface IProps {
  setRole: React.Dispatch<React.SetStateAction<string | null>>;
  role: string | null;
}

const AppRouter = ({ setRole, role }: IProps) => {
  const { auth } = useContext(AuthContext);

  return auth.isAuth ? (
    <Routes>
      {privateRoutes.map((route) => (
        <Route element={route.element} path={route.path} key={route.path} />
      ))}
      <Route
        element={<PortfolioPage />}
        path={"/portfolio"}
        key={"/portfolio"}
      ></Route>
      <Route element={<UsersPage />} path={"/users"} key={"/users"}></Route>
      <Route
        element={<ProfilePage />}
        path={"/profile"}
        key={"/profile"}
      ></Route>
      <Route
        element={<FavoritesPage userId={auth.userId} />}
        path={"/favorites"}
        key={"/favorites"}
      ></Route>
      <Route
        element={<CoinPage role={role} />}
        path={"/coins/:id"}
        key={"/coins/:id"}
      ></Route>
    </Routes>
  ) : (
    <Routes>
      <Route element={<MainPage />} path={"/"} key={"/"}></Route>

      <Route
        element={<LoginPage setRole={setRole} />}
        path={"/login"}
        key={"/login"}
      ></Route>

      <Route
        element={<CoinPage role={role} />}
        path={"/coins/:id"}
        key={"/coins/:id"}
      ></Route>

      <Route
        element={<RegPage />}
        path={"/registration"}
        key={"/registration"}
      ></Route>
    </Routes>
  );
};

export default AppRouter;
