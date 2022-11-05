import React from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useIntl } from 'react-intl';

interface IProps {
  setRole: React.Dispatch<React.SetStateAction<string | null>>;
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Logout = (props: IProps) => {
  const intl = useIntl()

  const { setIsAuth } = React.useContext(AuthContext);
  const routing = useNavigate()

  function logout() {
    sessionStorage.clear()
    setIsAuth(false)
    props.setRole('')
    props.handleClose()
    routing("/")
  }

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ marginBottom: 5 }}>
              {intl.formatMessage({ id: 'logout_title' })}
            </Typography>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Button
                style={{
                  width: 100,
                  marginRight: 20
                }}
                color="primary"
                variant="contained"
                onClick={logout}
              >
                {intl.formatMessage({ id: 'yes_btn' })}
              </Button>
              <Button
                style={{
                  width: 100,
                  marginRight: 20
                }}
                color="secondary"
                variant="contained"
                onClick={props.handleClose}
              >
                {intl.formatMessage({ id: 'no_btn' })}
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default Logout;