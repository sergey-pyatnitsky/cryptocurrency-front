import { SelectChangeEvent } from '@mui/material';
import { ChangeEventHandler } from 'react';
import AuthForm from '../UI/auth/AuthForm';
import { Navbar } from '../UI/navbar/Navbar';

// interface Props {
//   currentLocale: string,
//   handleChangeLanguage: SelectChangeEvent
// }

const AuthPage = (props: any) => {

  return (
    <>
      <Navbar currentLocale={props.currentLocale} handleChangeLanguage={props.handleChangeLanguage} />
      <AuthForm />
    </>
  )
}

export default AuthPage;