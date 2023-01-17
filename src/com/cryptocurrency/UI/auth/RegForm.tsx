import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import {Link, useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import regLink from '../../assets/images/auth.png'
import {useIntl} from 'react-intl';
import React, {useState} from 'react';
import RegistrationService from '../../service/RegistrationService';
import CustomAlert from "../alert/CustomAlert";
import error from "../../model/error";

const RegForm = () => {
  const intl = useIntl()

  const route = useNavigate();
  const [info, setInfo] = useState({user: {username: '', password: ''}, email: '', name: ''});
  const [repeatPassword, setRepeatPassword] = useState('');

  const [error, setError] = useState({
      alertError: false,
      fields:
        {login: false, password: false, email: false, full_name: false}
    }
  )
  const [errorMsg, setErrorMsg] = useState("")

  function setDefaultErrorStatus() {
    setError({
        alertError: false,
        fields:
          {login: false, password: false, email: false, full_name: false}
      }
    )
  }

  function registration(e: any) {
    e.preventDefault();
    if (checkForPasswordCoincidence(info.user.password, repeatPassword)) {
      RegistrationService.register(info).then(() => {
        setDefaultErrorStatus()
        route("/login")
      }).catch((err: error) => {
        console.log(err)
        if (err.response.status == 415) {
          setErrorMsg(intl.formatMessage({id: 'error_invalid_data'}) +
            ':' + err.response.data.error.split('$')[1])
          let field = err.response.data.error.split('$')[0]
          setError({
            alertError: true,
            fields: {
              login: field === "Login",
              password: field === "Password",
              email: field === "Email",
              full_name: field === "Name"
            }
          })
        } else if (err.response.status == 403) {
          setErrorMsg(intl.formatMessage({id: 'error_user_exists'}))
          setError({
            alertError: true,
            fields:
              {login: true, password: false, email: false, full_name: false}
          })
        } else {
          setErrorMsg(intl.formatMessage({id: 'error_alert'}))
          setError({
            alertError: true,
            fields:
              {login: true, password: true, email: true, full_name: true}
          })
        }
      })
    } else {
      setErrorMsg(intl.formatMessage({id: 'error_repeat_password'}))
      setError({
        alertError: true,
        fields:
          {login: false, password: true, email: false, full_name: false}
      })
    }
  }

  function checkForPasswordCoincidence(password: string, repeatPassword: string) {
    return password == repeatPassword && password != ''.trim()
  }

  return (
    <>
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
          rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}} xs={3}>
          <Grid item>
            <h1>{intl.formatMessage({id: 'reg_title'})}</h1>
          </Grid>
          <Grid item>
            <TextField
              required
              id="username-input"
              label="Username/Email"
              placeholder="admin"
              helperText={error.fields.login ? intl.formatMessage({id: 'error_incorrect_entry'}) : null}
              sx={{width: "300px"}}
              onChange={(e) => {
                setInfo({...info, user: {...info.user, username: e.target.value}})
              }}
            />
            <TextField
              error={error.fields.password}
              id="password-input"
              label={intl.formatMessage({id: 'pass_text'})}
              placeholder="@Admin123"
              helperText={error.fields.password ? intl.formatMessage({id: 'error_incorrect_entry'}) : null}
              sx={{width: "300px", marginTop: 1}}
              onChange={(e) => {
                setInfo({...info, user: {...info.user, password: e.target.value}})
              }}
            />
            <TextField
              error={error.fields.password}
              id="password-repeat-input"
              label={intl.formatMessage({id: 'pass_text'})}
              placeholder="@Admin123"
              helperText={error.fields.password ? intl.formatMessage({id: 'error_incorrect_entry'}) : null}
              sx={{width: "300px", marginTop: 1}}
              onChange={(e) => {
                setRepeatPassword(e.target.value)
              }}
            />
            <TextField
              error={error.fields.full_name}
              id="name-input"
              label={intl.formatMessage({id: 'full_name_text'})}
              placeholder={intl.formatMessage({id: 'full_name_placeholder'})}
              helperText={error.fields.full_name ? intl.formatMessage({id: 'error_incorrect_entry'}) : null}
              sx={{width: "300px", marginTop: 1}}
              onChange={(e) => {
                setInfo({...info, name: e.target.value})
              }}
            />
            <TextField
              error={error.fields.email}
              id="email-input"
              label="Email"
              placeholder="admin123@gmail.com"
              helperText={error.fields.email ? intl.formatMessage({id: 'error_incorrect_entry'}) : null}
              sx={{width: "300px", marginTop: 1}}
              onChange={(e) => {
                setInfo({...info, email: e.target.value})
              }}
            />
          </Grid>
          <Grid item sx={{marginTop: 1}}>
            <Button
              style={{width: '300px', height: '56px'}} variant="contained"
              onClick={registration}
            >
              {intl.formatMessage({id: 'continue_btn'})}
            </Button>
          </Grid>
          <Grid item>
            <Divider
              textAlign="center"
              style={{width: '300px'}}
            >{intl.formatMessage({id: 'continue_with_btn'})}</Divider>
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
              }>{intl.formatMessage({id: 'continue_google_btn'})}
            </Button>
          </Grid>
        </Grid>

        <Grid
          item
          direction="column"
          justifyContent="center"
          alignItems="center"
          rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}} xs={3}>
          <Grid item>
            <Box
              component="img"
              sx={{
                maxWidth: 400,
              }}
              alt="Register page"
              src={regLink}
            />
            <h3 style={{textAlign: 'center'}}>{intl.formatMessage({id: 'login_image_text'})}</h3>
          </Grid>
          <Grid item justifyContent="center"
                alignItems="center" sx={{marginLeft: 10}}>
            {intl.formatMessage({id: 'reg_auth_link_text'})}
            <Link to="/login" color="secondary"
                  style={{textDecoration: "none", width: 100, marginLeft: 90}}
            >
              Войти
            </Link>
          </Grid>
        </Grid>
      </Grid>
      {
        error.alertError ?
          <CustomAlert severity={"error"} errorMsg={errorMsg} error={error} setError={setError}/> : null
      }
    </>
  );
}

export default RegForm;