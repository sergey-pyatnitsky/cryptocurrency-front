import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import {
  API_BASE_URL,
  API_DOWNLOAD_PROFILE_IMAGE_URL,
  USER_IMAGE_ID,
} from "../../service/CommonService";
import Logout from "./Logout";

interface IProps {
  setRole: React.Dispatch<React.SetStateAction<string | null>>;
}

const SettingsButton = (props: IProps) => {
  const intl = useIntl();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const imageId = sessionStorage.getItem(USER_IMAGE_ID);

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          {imageId !== undefined ? (
            <Avatar
              alt="Remy Sharp"
              src={API_BASE_URL + API_DOWNLOAD_PROFILE_IMAGE_URL + imageId}
            />
          ) : (
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          )}
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem key="Profile" onClick={handleCloseUserMenu}>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <Typography textAlign="center" variant="button">
              {intl.formatMessage({ id: "profile" })}
            </Typography>
          </Link>
        </MenuItem>
        <MenuItem key="Logout" onClick={handleCloseUserMenu}>
          <Typography textAlign="center" variant="button" onClick={handleOpen}>
            {intl.formatMessage({ id: "logout" })}
          </Typography>
        </MenuItem>
      </Menu>
      <Logout
        setRole={props.setRole}
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
    </Box>
  );
};

export default SettingsButton;
