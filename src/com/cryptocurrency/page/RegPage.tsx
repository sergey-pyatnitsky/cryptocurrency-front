import { SelectChangeEvent } from '@mui/material';
import { ChangeEventHandler } from 'react';
import RegForm from '../UI/auth/RegForm';
import { Navbar } from '../UI/navbar/Navbar';

interface Props {
  currentLocale: string,
  handleChangeLanguage: SelectChangeEvent
}

const RegPage = (props: Props) => {
  return (
    <>
      <Navbar currentLocale={props.currentLocale} handleChangeLanguage={props.handleChangeLanguage} />
      <RegForm />
    </>
  )
}

export default RegPage;