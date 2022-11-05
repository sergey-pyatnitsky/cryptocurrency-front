import { ReactNode } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { ThemeSwitchButton } from "../theme/ThemeSwitchButton";
import SettingsButton from './SettingsButton';
import NavbarPages from './NavbarPages';
import SwitchButtons from './SwitchButtons';
import { SelectChangeEvent } from "@mui/material";

interface IProps {
  role: string | null;
  setRole: React.Dispatch<React.SetStateAction<string | null>>;
  isAuth: boolean;
  currentLocale: string;
  handleChangeLanguage: (event: SelectChangeEvent<string>, child: ReactNode) => void;
}

export function Navbar(props: IProps) {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NavbarPages role={props.role} isAuth={props.isAuth} />
          <SwitchButtons isAuth={props.isAuth} currentLocale={props.currentLocale} handleChangeLanguage={props.handleChangeLanguage} />
          <ThemeSwitchButton />
          {props.isAuth ? <SettingsButton setRole={props.setRole} /> : null}
        </Toolbar>
      </Container>
    </AppBar>
  );
}