import { SelectChangeEvent } from '@mui/material';
import { ChangeEventHandler } from 'react';
import RegForm from '../UI/auth/RegForm';
import { Navbar } from '../UI/navbar/Navbar';

interface Props {
  currentLocale: string,
  handleChangeLanguage: SelectChangeEvent
}

const RegPage = () => {
  return (
    <>
      <RegForm />
    </>
  )
}

export default RegPage;