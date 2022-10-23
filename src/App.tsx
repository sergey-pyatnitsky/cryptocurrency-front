import { useState } from 'react';
import ThemeWrapper from './com/cryptocurrency/wrapper/ThemeWrapper'
import { IntlProvider } from "react-intl";
import { LOCALES } from "./com/cryptocurrency/i18n/locales";
import { messages } from "./com/cryptocurrency/i18n/messages";
import { Navbar } from './com/cryptocurrency/UI/navbar/Navbar';
import MainPage from './com/cryptocurrency/page/MainPage';
import { SelectChangeEvent } from '@mui/material';
import CryptoContext from './com/cryptocurrency/context/CryptoContext';
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
    <BrowserRouter>
      <IntlProvider
        messages={messages[currentLocale]}
        locale={currentLocale}
        defaultLocale={LOCALES.RUSSIAN}
      >
        <ThemeWrapper>
          <CryptoContext>
            <Routes>
              <Route path="/" element={<MainPage currentLocale={currentLocale} handleChangeLanguage={handleChangeLanguage} />} />
              {/* <MainPage currentLocale={currentLocale} handleChangeLanguage={handleChangeLanguage} /> */}
            </Routes>
          </CryptoContext>

        </ThemeWrapper>
      </IntlProvider>
    </BrowserRouter>
  );
}

export default App;
