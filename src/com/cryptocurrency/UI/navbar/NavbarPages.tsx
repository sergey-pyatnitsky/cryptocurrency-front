import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import darkLogo from '../../assets/images/icons/darkLogo.svg'
import lightLogo from '../../assets/images/icons/lightLogo.svg'
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';

interface IProps {
  role: string | null;
  isAuth: boolean;
}

const NavbarPages = (props: IProps) => {
  const theme = useTheme();
  const [navLinks, setNavLinks] = useState<React.ReactNode>();

  useEffect(() => {
    setNavLinks(getNavLinks())
  }, [props.role, props.isAuth])

  const getNavLinks = () => {
    switch (props.role) {
      case 'ADMIN':
        return (
          <>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button
                key='login'
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Admin - Login
              </Button>
            </Link>

            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button
                key='login'
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Admin - Login2
              </Button>
            </Link>
          </>
        )
      case 'USER':
        return (
          <>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button
                key='login'
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                User - Login
              </Button>
            </Link>

            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button
                key='login'
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                User - Login2
              </Button>
            </Link>
          </>
        )
      default:
        return "";
    }
  }

  return (
    <>
      <Link to="/">
        <img src={theme.palette.mode === 'dark' ? darkLogo : lightLogo} alt="" />
      </Link>

      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {navLinks}
      </Box>

      {props.isAuth
        ? <></>
        : <>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              color="primary"
              key='login'
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Войти
            </Button>
          </Link>
        </>
      }
    </>
  )
}

export default NavbarPages;