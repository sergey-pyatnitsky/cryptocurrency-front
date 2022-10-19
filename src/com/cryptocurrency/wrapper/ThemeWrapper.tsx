import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { ReactNode } from 'react'
import ColorModeContext from '../context/ColorModeContext'
import { amber, deepOrange, blue } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';

interface Props {
    children?: ReactNode
}

function ThemeWrapper({ children }: Props) {

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
                            primary: amber,
                            secondary: {
                                main: "#eaecef",
                            },
                            // secondary: blue[50],
                            divider: amber[200],
                            text: {
                                primary: '#1e2329',
                                secondary: '#707a8a',
                            },
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
                                paper: '#181a20',
                            },
                            text: {
                                primary: '#eaecef',
                                secondary: '#848e9c',
                            },
                        }),
                },
            }),
        [mode],
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default ThemeWrapper;