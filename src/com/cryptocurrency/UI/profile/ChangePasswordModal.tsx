import { Box, Button, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useIntl } from "react-intl";
import ErrorProps from "../../model/error";
import ResponseProps from "../../model/response";
import UserService from "../../service/UserService";
import CustomAlert from "../alert/CustomAlert";

interface ChangePasswordModalProps {
  handleClose: () => void;
  open: boolean;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  height: "55%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ChangePasswordModal = (props: ChangePasswordModalProps) => {
  const intl = useIntl();

  const [pass, setPass] = useState({
    old_pass: "",
    new_pass: "",
    repeat_new_pass: "",
  });

  const [error, setError] = useState({ alertError: false });
  const [errorMsg, setErrorMsg] = useState("");

  const changeUserPassword = () => {
    if (pass.new_pass !== pass.repeat_new_pass) {
      setError({ alertError: true });
      setErrorMsg(intl.formatMessage({ id: "Ошибка повторного ввода пароля" }));
    } else {
      UserService.changeUserPassword(
        pass.old_pass,
        pass.new_pass,
        sessionStorage.getItem("username")
      )
        .then((resp: ResponseProps) => {
          console.log(resp);
          setPass({
            old_pass: "",
            new_pass: "",
            repeat_new_pass: "",
          });
          setError({ alertError: false });
          props.handleClose();
        })
        .catch((err: ErrorProps) => {
          setError({ alertError: true });
          if (err.response.status === 415)
            setErrorMsg(intl.formatMessage({ id: "pass_incorrect_format" }));
          else if (err.response.status === 403)
            setErrorMsg(intl.formatMessage({ id: "old_pass_doesnt_mutch" }));
          else setErrorMsg(intl.formatMessage({ id: "error" }));
        });
    }
  };

  return (
    <>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography gutterBottom variant="h5" sx={{ marginBottom: 3 }}>
            <Box sx={{ fontWeight: "bold" }}>
              {intl.formatMessage({ id: "changing_password" })}
            </Box>
          </Typography>
          <Box>
            <TextField
              id="pass-input"
              helperText={intl.formatMessage({ id: "old_password" })}
              placeholder="@User123"
              sx={{ width: "100%", marginBottom: 1 }}
              onChange={(e) => setPass({ ...pass, old_pass: e.target.value })}
            />
            <TextField
              id="old-pass-input"
              helperText={intl.formatMessage({ id: "new_password" })}
              placeholder="@Admin123"
              sx={{ width: "100%", marginBottom: 1 }}
              onChange={(e) => setPass({ ...pass, new_pass: e.target.value })}
            />
            <TextField
              id="old-pass-input"
              helperText={intl.formatMessage({ id: "repeat_new_password" })}
              placeholder="@Admin123"
              sx={{ width: "100%", marginBottom: 1 }}
              onChange={(e) =>
                setPass({ ...pass, repeat_new_pass: e.target.value })
              }
            />
            <Button
              size="small"
              variant="contained"
              sx={{ marginLeft: "60%" }}
              onClick={changeUserPassword}
            >
              {intl.formatMessage({ id: "save" })}
            </Button>
          </Box>
        </Box>
      </Modal>
      {error.alertError ? (
        <CustomAlert
          severity={"error"}
          errorMsg={errorMsg}
          error={error}
          setError={setError}
        />
      ) : null}
    </>
  );
};

export default ChangePasswordModal;
