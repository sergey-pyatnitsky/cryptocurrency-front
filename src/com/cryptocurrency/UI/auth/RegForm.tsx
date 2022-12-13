import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import regLink from '../../assets/images/auth.png'
import { useIntl } from 'react-intl';
import { useState } from 'react';
import RegistrationService from '../../service/RegistrationService';
import { useNavigate } from 'react-router-dom';

const RegForm = () => {
  const intl = useIntl()

  const route = useNavigate();
  // const [info, setInfo] = useState({ username: '', password: '', email: '', name: '' });
  const [info, setInfo] = useState({ user: { username: '', password: '' }, email: '', name: '' });
  const [fieldError, setFieldError] = useState("");
  const [repeatPassword, setRepeatPassword] = useState('');

  function registration(e: any) {
    e.preventDefault();
    if (checkForPasswordCoincidence(info.user.password, repeatPassword)) {
      setFieldError("");
      RegistrationService.register(info).then(resp => {
        route("/login")
      }).catch(err => {
        console.log(err.response.data)
        let errorData = err.response.data
        console.log(errorData)
        // bindErrorFields(errorData);
      })
    } else {
      console.log("fuild")
      // setFieldError({ ...fieldError, fieldRepeatPassword: "Passwords not match" });
    }
  }

  function checkForPasswordCoincidence(password: string, repeatPassword: string) {
    return password == repeatPassword
  }

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      marginTop="15px"
    >
      <Grid
        item
        direction="column"
        justifyContent="center"
        alignItems="center"
        rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} xs={3}>
        <Grid item>
          <h1>Регистрация</h1>
        </Grid>
        <Grid item>
          <TextField
            required
            id="username-input"
            label="Username/Email"
            placeholder="admin"
            // helperText="Incorrect entry."
            sx={{ width: "300px" }}
            onChange={(e) => { setInfo({ ...info, user: { ...info.user, username: e.target.value } }) }}
          />
          <TextField
            id="password-input"
            label="Пароль"
            placeholder="@Admin123"
            sx={{ width: "300px", marginTop: 1 }}
            onChange={(e) => { setInfo({ ...info, user: { ...info.user, password: e.target.value } }) }}
          />
          <TextField
            id="password-repeat-input"
            label="Пароль"
            placeholder="@Admin123"
            sx={{ width: "300px", marginTop: 1 }}
            onChange={(e) => { setRepeatPassword(e.target.value) }}
          />
          <TextField
            id="name-input"
            label="ФИО"

            placeholder="Иванов Иван Иванович"
            sx={{ width: "300px", marginTop: 1 }}
            onChange={(e) => { setInfo({ ...info, name: e.target.value }) }}
          />
          <TextField
            id="email-input"
            label="Email"
            placeholder="admin123@gmail.com"
            sx={{ width: "300px", marginTop: 1 }}
            onChange={(e) => { setInfo({ ...info, email: e.target.value }) }}
          />
        </Grid>
        <Grid item sx={{ marginTop: 1 }}>
          <Button
            style={{ width: '300px', height: '56px' }} variant="contained"
            onClick={registration}
          >
            {intl.formatMessage({ id: 'continue_btn' })}
          </Button>
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
        direction="column"
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
          alignItems="center" sx={{ marginLeft: 10 }}>
          {intl.formatMessage({ id: 'reg_auth_link_text' })}
          <Link to="/login" color="secondary"
            style={{ textDecoration: "none", width: 100, marginLeft: 90 }}
          >
            Войти
          </Link>
        </Grid>
      </Grid>
    </Grid >
  );
}

export default RegForm;