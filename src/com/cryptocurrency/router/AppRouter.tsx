import { useContext } from 'react';
import { AuthContext } from "../context/AuthContext";
import { Route, Routes } from "react-router-dom";
import { privateRoutes } from "./routes";
import RegPage from '../page/RegPage';
import LoginPage from '../page/LoginPage';
import MainPage from '../page/MainPage';

interface IProps {
  setRole: React.Dispatch<React.SetStateAction<string | null>>;
}

const AppRouter = ({ setRole }: IProps) => {
  const { isAuth } = useContext(AuthContext);

  return (
    isAuth ?
      <Routes>
        {
          privateRoutes.map(route =>
            <Route
              element={route.element}
              path={route.path}
              key={route.path} />)
        }
      </Routes>
      :
      <Routes>
        <Route
          element={<MainPage />}
          path={'/'}
          key={'/'}>
        </Route>

        <Route
          element={<LoginPage setRole={setRole} />}
          path={'/login'}
          key={'/login'}>
        </Route>

        <Route
          element={<RegPage />}
          path={'/registration'}
          key={'/registration'}>
        </Route>
      </Routes>

  );
};

export default AppRouter;