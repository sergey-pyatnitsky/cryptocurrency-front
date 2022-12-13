import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import Logout from './Logout';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface IProps {
  setRole: React.Dispatch<React.SetStateAction<string | null>>;
}

const SettingsButton = (props: IProps) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem key="Profile" onClick={handleCloseUserMenu}>
          <Link to="/profile" style={{ textDecoration: 'none' }}>
            <Typography
              textAlign="center"
              variant="button"
            >
              Профиль
            </Typography>
          </Link>
        </MenuItem>
        <MenuItem key="Logout" onClick={handleCloseUserMenu}>
          <Typography
            textAlign="center"
            variant="button"
            onClick={handleOpen}
          >
            Выйти
          </Typography>
        </MenuItem>
      </Menu>
      <Logout setRole={props.setRole} open={open} handleOpen={handleOpen} handleClose={handleClose} />
    </Box>
  )
}

export default SettingsButton;