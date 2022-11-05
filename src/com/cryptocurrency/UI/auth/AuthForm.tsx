import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { Link, Route, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import regLink from '../../assets/images/auth.png';
import { useIntl } from 'react-intl';
import { GOOGLE_AUTH_URL } from '../../service/CommonService';
import AuthenticationService from '../../service/AuthenticationService';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import getDefaultRoleRoute from '../../router/routes';

interface IProps {
  setRole: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthForm = ({ setRole }: IProps) => {
  const intl = useIntl()

  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [error, setError] = useState(false)
  const { setIsAuth } = useContext(AuthContext)
  const route = useNavigate();

  function login(e: any) {
    e.preventDefault();
    AuthenticationService.tryToLogin(credentials.username, credentials.password)
      .then(resp => {
        console.log(resp)

        const role = AuthenticationService.getMainRoleFromDecodedJwtToken(resp.data)

        setError(false)
        setRole(role)
        setIsAuth(true)
        AuthenticationService.saveRoleLoggedUserToSessionStorage(role)
        AuthenticationService.saveBearerAuthTokenToSessionStorage(resp.data);
        route(getDefaultRoleRoute(role))
      }).catch(err => {
        console.log(err)
        // setError("Invalid email or password");
      })
  }

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      marginTop="100px"
    >
      <Grid
        item
        justifyContent="center"
        alignItems="center"
        rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} xs={3}>
        <Grid item>
          <h1>{intl.formatMessage({ id: 'login_title' })}</h1>
        </Grid>
        <Grid item>
          <TextField
            required
            id="username-input"
            label="Username/Email"
            placeholder="admin"
            helperText="Incorrect entry."
            sx={{ width: "300px" }}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          />
        </Grid>
        <Grid item>
          <TextField
            error
            id="password-input"
            label="Password"
            placeholder="@Admin123"
            helperText="Incorrect entry."
            sx={{ width: "300px" }}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
        </Grid>
        <Grid item>
          <Button
            style={{
              width: '300px',
              height: '56px'
            }}
            variant="contained"
            onClick={login}
          >{intl.formatMessage({ id: 'continue_btn' })}</Button>
        </Grid>
        <Grid item>
          <Divider
            textAlign="center"
            style={{ width: '300px' }}
          >{intl.formatMessage({ id: 'continue_with_btn' })}</Divider>
        </Grid>
        <Grid item>
          <Button
            style={{
              width: '300px',
              height: '56px'
            }}
            color="secondary"
            variant="contained"
            component={Link} to={GOOGLE_AUTH_URL}
            startIcon={
              <Box
                component="img"
                alt="The house from the offer."
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              />
            }>{intl.formatMessage({ id: 'continue_google_btn' })}
          </Button>
        </Grid>
      </Grid>

      <Grid
        item
        justifyContent="center"
        alignItems="center"
        rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} xs={3}>
        <Grid item>
          <Box
            component="img"
            sx={{
              maxWidth: 400,
            }}
            alt="Register page"
            src={regLink}
          />
          <h3 style={{ textAlign: 'center' }}>{intl.formatMessage({ id: 'login_image_text' })}</h3>
        </Grid>
        <Grid item justifyContent="center"
          alignItems="center">
          <Link to="/registration" color="secondary"
            style={{ textDecoration: "none", width: 100, marginLeft: 90 }}
          >
            {intl.formatMessage({ id: 'login_reg_link_text' })}
          </Link>
        </Grid>
      </Grid>
    </Grid >
  );
}

export default AuthForm;