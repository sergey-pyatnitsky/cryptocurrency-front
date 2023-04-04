import AuthForm from "../UI/auth/AuthForm";

interface IProps {
  setRole: React.Dispatch<React.SetStateAction<string | null>>;
}

const LoginPage = ({ setRole }: IProps) => <AuthForm setRole={setRole} />;

export default LoginPage;
