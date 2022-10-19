import React, { useContext } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';

const AuthForm = () => {

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      marginTop="100px"
      rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      <Grid item xs="auto">
        <h1>Binance Login</h1>
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
        <Divider
          textAlign="center"
          style={{ width: '300px' }}
        // light={theme === 'dark' ? false : true}>or continue with</Divider>
        >or continue with</Divider>
      </Grid>
    </Grid >
  );
}

export default AuthForm;