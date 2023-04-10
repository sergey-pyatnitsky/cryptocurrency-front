import {createTheme, ThemeProvider} from '@mui/material/styles';
import React, {ReactNode} from 'react'
import ColorModeContext from '../context/ColorModeContext'
import {amber} from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';

interface Props {
  children?: ReactNode
}

function ThemeWrapper({children}: Props) {

  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
              // palette values for light mode
              primary: {
                main: '#1b9129',
              },
              secondary: {
                main: "#911b83",
              },
              background: {
                default: '#f0f0f0',
                paper: '#dedede',
              },
              divider: amber[200],
              text: {
                primary: '#1e2329',
                secondary: '#2F4f4f',
              },
              head: {
                main: "#1b9164",
              }
            }
            : {
              // palette values for dark mode
              primary: {
                main: '#fcd535',
              },
              secondary: {
                main: '#474d57'
              },
              divider: '#848e9c',
              background: {
                default: '#181a20',
                paper: '#414146',
              },
              text: {
                primary: '#eaecef',
                secondary: '#848e9c',
              },
              head: {
                main: "#1b9164",
              }
            }),
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default ThemeWrapper;