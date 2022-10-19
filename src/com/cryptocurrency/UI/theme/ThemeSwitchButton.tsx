import { useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import IconButton from "@mui/material/IconButton";
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import ColorModeContext from '../../context/ColorModeContext'


export function ThemeSwitchButton() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
      {theme.palette.mode === 'dark' ? <Brightness7Icon style={{ color: '#FFF6F0' }} /> : <Brightness4Icon style={{ color: '#2C3131' }} />}
    </IconButton>
  )
}