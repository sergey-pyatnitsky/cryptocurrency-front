import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import regLink from '../../assets/images/auth.png';
import { useIntl } from 'react-intl';

const AuthForm = () => {
  const intl = useIntl()

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
          />
        </Grid>
        <Grid item>
          <Button style={{ width: '300px', height: '56px' }} variant="contained">{intl.formatMessage({ id: 'continue_btn' })}</Button>
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
          <Link href="#" underline="none" sx={{ width: 100, marginLeft: 12 }}>
            {intl.formatMessage({ id: 'login_reg_link_text' })}
          </Link>
        </Grid>
      </Grid>
    </Grid >
  );
}

export default AuthForm;