import { useEffect, useState } from 'react';
import ThemeWrapper from './com/cryptocurrency/wrapper/ThemeWrapper'
import { IntlProvider } from "react-intl";
import { LOCALES } from "./com/cryptocurrency/i18n/locales";
import { messages } from "./com/cryptocurrency/i18n/messages";
import { Navbar } from './com/cryptocurrency/UI/navbar/Navbar';
import { SelectChangeEvent } from '@mui/material';
import CryptoContext from './com/cryptocurrency/context/CryptoContext';
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from './com/cryptocurrency/context/AuthContext';
import AppRouter from './com/cryptocurrency/router/AppRouter';
import { LOCALE_KEY, LOGGED_USER_ROLE_KEY, TOKEN_KEY } from './com/cryptocurrency/service/CommonService';

function App() {
  const [currentLocale, setCurrentLocale] = useState(getInitialLocal());
  const [isAuth, setIsAuth] = useState(false)
  const [role, setRole] = useState(sessionStorage.getItem(LOGGED_USER_ROLE_KEY) ?
    sessionStorage.getItem(LOGGED_USER_ROLE_KEY) : '')

  useEffect(() => {
    if (sessionStorage.getItem(TOKEN_KEY)) {
      setIsAuth(true)
    }
  }, [])

  function getInitialLocal() {
    const savedLocale = localStorage.getItem(LOCALE_KEY);
    return savedLocale || LOCALES.RUSSIAN;
  }

  const handleChangeLanguage = (e: SelectChangeEvent) => {
    setCurrentLocale(e.target.value);
    localStorage.setItem(LOCALE_KEY, e.target.value);
  };

  return (
    <AuthContext.Provider value={
      { isAuth, setIsAuth }}>
      <BrowserRouter>
        <IntlProvider
          messages={messages[currentLocale]}
          locale={currentLocale}
          defaultLocale={LOCALES.RUSSIAN}
        >
          <ThemeWrapper>
            <CryptoContext>
              <Navbar role={role} setRole={setRole} isAuth={isAuth} currentLocale={currentLocale} handleChangeLanguage={handleChangeLanguage} />
              <AppRouter setRole={setRole} />
            </CryptoContext>
          </ThemeWrapper>
        </IntlProvider>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
