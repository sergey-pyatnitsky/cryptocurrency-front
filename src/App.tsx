import { useState } from 'react';
import ThemeWrapper from './com/cryptocurrency/wrapper/ThemeWrapper'
import { IntlProvider } from "react-intl";
import { LOCALES } from "./com/cryptocurrency/i18n/locales";
import { messages } from "./com/cryptocurrency/i18n/messages";
import { Navbar } from './com/cryptocurrency/UI/navbar/Navbar';
import AuthPage from './com/cryptocurrency/page/AuthPage';
import { SelectChangeEvent } from '@mui/material';

function App() {
  const [currentLocale, setCurrentLocale] = useState(getInitialLocal());

  function getInitialLocal() {
    const savedLocale = localStorage.getItem("locale");
    return savedLocale || LOCALES.RUSSIAN;
  }

  const handleChangeLanguage = (e: SelectChangeEvent) => {
    setCurrentLocale(e.target.value);
    localStorage.setItem("locale", e.target.value);
  };

  return (
    <IntlProvider
      messages={messages[currentLocale]}
      locale={currentLocale}
      defaultLocale={LOCALES.RUSSIAN}
    >
      <ThemeWrapper>
        <AuthPage currentLocale={currentLocale} handleChangeLanguage={handleChangeLanguage} />
      </ThemeWrapper>
    </IntlProvider>
  );
}

export default App;
