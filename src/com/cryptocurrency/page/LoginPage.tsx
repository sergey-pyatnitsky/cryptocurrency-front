import { SelectChangeEvent } from '@mui/material';
import { ChangeEventHandler } from 'react';
import AuthForm from '../UI/auth/AuthForm';
import RegForm from '../UI/auth/RegForm';
import { Navbar } from '../UI/navbar/Navbar';

interface IProps {
  setRole: React.Dispatch<React.SetStateAction<string | null>>;
}

const LoginPage = ({setRole}:IProps) => {
  return (
    <>
      <AuthForm setRole={setRole}/>
    </>
  )
}

export default LoginPage;