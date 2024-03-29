import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import darkLogo from "../../assets/images/icons/darkLogo.svg";
import lightLogo from "../../assets/images/icons/lightLogo.svg";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";

interface IProps {
  role: string | null;
  isAuth: boolean;
}

const NavbarPages = (props: IProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const [navLinks, setNavLinks] = useState<React.ReactNode>();

  useEffect(() => {
    const navLinks = () => {
        switch (props.role) {
          case "ADMIN":
            return (
              <>
                <Link to="/favorites" style={{ textDecoration: "none" }}>
                  <Button
                    key="Favorites"
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {intl.formatMessage({ id: "coin_tracking" })}
                  </Button>
                </Link>
                <Link to="/portfolio" style={{ textDecoration: "none" }}>
                  <Button
                    key="Portfolio"
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {intl.formatMessage({ id: "portfolio" })}
                  </Button>
                </Link>

                <Link to="/users" style={{ textDecoration: "none" }}>
                  <Button
                    key="Users"
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {intl.formatMessage({ id: "users" })}
                  </Button>
                </Link>
              </>
            );
          case "USER":
            return (
              <>
                <Link to="/favorites" style={{ textDecoration: "none" }}>
                  <Button
                    key="Favorites"
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {intl.formatMessage({ id: "coin_tracking" })}
                  </Button>
                </Link>

                <Link to="/portfolio" style={{ textDecoration: "none" }}>
                  <Button
                    key="Portfolio"
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {intl.formatMessage({ id: "portfolio" })}
                  </Button>
                </Link>
              </>
            );
          default:
            return "";
        }
      }
      setNavLinks(navLinks)
  }, [props.role, props.isAuth, intl]);

  return (
    <>
      <Link to="/">
        <img
          src={theme.palette.mode === "dark" ? darkLogo : lightLogo}
          alt=""
        />
      </Link>

      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {navLinks}
      </Box>

      {props.isAuth ? (
        <></>
      ) : (
        <>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              key="login"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Войти
            </Button>
          </Link>
        </>
      )}
    </>
  );
};

export default NavbarPages;
