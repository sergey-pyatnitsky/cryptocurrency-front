import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useState } from "react";

import UserProps from "../../model/user";
import { useIntl } from "react-intl";

interface IEditUserModalProps {
  handleCloseEditModal: () => void;
  openEditModal: boolean;
  editUserRole: (username: string, role: string) => void;
  currUser: UserProps;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const EditUserModal = (props: IEditUserModalProps) => {
  const intl = useIntl();

  const [role, setRole] = useState<string>("USER");
  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  return (
    <Modal open={props.openEditModal} onClose={props.handleCloseEditModal}>
      <Box sx={style}>
        <Typography gutterBottom variant="h6" sx={{ marginBottom: 4 }}>
          <Box sx={{ fontWeight: "bold" }}>
            {intl.formatMessage({ id: "edit_user_role" })}
          </Box>
        </Typography>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              {intl.formatMessage({ id: "user_role" })}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={role}
              label={intl.formatMessage({ id: "user_role" })}
              onChange={handleChange}
            >
              <MenuItem value={"ADMIN"}>Администратор</MenuItem>
              <MenuItem value={"USER"}>Пользователь</MenuItem>
            </Select>
          </FormControl>
          <Button
            size="small"
            variant="contained"
            sx={{ marginLeft: "60%", marginTop: 2 }}
            onClick={() =>
              props.editUserRole(props.currUser.user.username, role)
            }
          >
            {intl.formatMessage({ id: "edit" })}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditUserModal;
