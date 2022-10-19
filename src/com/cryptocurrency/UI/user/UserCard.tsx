import { Box, Button, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useCallback, useEffect, useReducer, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ActivateUser, EditUserRole, RemoveUser } from '../../config/api';
import axios from "axios";
import { API_BASE_URL } from '../../service/CommonService';

interface IUserProps {
  "id": number
  "user": {
    "username": string
    "password": string
    "active": boolean
    "authority": {
      "role": string
    }
  }
  "name": string
  "email": string
  "phone": string
  "country": string
  "address": string
  "imageId": string
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const UserCard = (userInfo: IUserProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [role, setRole] = useState(userInfo.user.authority.role);
  const [active, setActive] = useState<boolean>(userInfo.user.active);

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  const editUserRole = async () => {
    axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token")
    await axios.put(EditUserRole(userInfo.user.username, role));
    handleClose()
    userInfo.user.authority.role = role
  }

  const activateUser = async () => {
    setActive(!active)
    axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token")
  }

  const removeUser = async () => {
    axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token")
    await axios.delete(RemoveUser(userInfo.user.username));
  }

  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const f = async () => {
      axios.put(ActivateUser(userInfo.user.username, active));
      userInfo.user.active = active
      forceUpdate()
    }
    f()
  }, [active])

  return (
    <Card sx={{ marginTop: 1 }}>
      <Grid container>
        <Grid item xs={2}>
          <CardMedia
            component="img"
            alt="green iguana"
            image={API_BASE_URL + "/downloadFile/" + userInfo.imageId}
          />
        </Grid>
        <Grid item xs={9}>
          <Box>
            <CardContent sx={{ textAlign: 'start' }}>
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant="h5">
                    {userInfo.name}
                    <Typography variant="body2" component="span" color="white"
                      sx={{
                        backgroundColor: userInfo.user.active ? "green" : "red",
                        borderRadius: 10,
                        padding: 1,
                        marginLeft: 1
                      }}>
                      {
                        userInfo.user.active ? "Активен" : "Заблокирован"
                      }
                    </Typography>
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" >
                    {userInfo.country}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {`Логин: ` + userInfo.user.username + ` (` + userInfo.user.authority.role + `)`}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {`Email: ` + userInfo.email}
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="subtitle1" color="text.secondary">
                    {`Номер телефона: `}
                    {userInfo.phone === null ? `-` : userInfo.phone}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {`Адрес: `}
                    {userInfo.address === null ? `-` : userInfo.address}
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Button size="small" variant="contained" sx={{ marginTop: 1 }} onClick={activateUser}>
                    {userInfo.user.active ? "Заблокировать" : "Разблокировать"}
                  </Button>
                  <Button size="small" variant="contained" sx={{ marginTop: 1 }} onClick={handleOpen}>
                    Изменить
                  </Button>
                  <Button size="small" variant="contained" color="secondary" sx={{ marginTop: 1 }} onClick={removeUser}>
                    Удалить
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Box>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography gutterBottom variant="h6" sx={{ marginBottom: 4 }}>
            <Box sx={{ fontWeight: 'bold' }}>
              Изменение роли пользователя
            </Box>
          </Typography>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Роль пользователя</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                label="Роль пользователя"
                onChange={handleChange}
              >
                <MenuItem value={"ADMIN"}>Администратор</MenuItem>
                <MenuItem value={"USER"}>Пользователь</MenuItem>
              </Select>
            </FormControl>
            <Button size="small" variant="contained" sx={{ marginLeft: "60%", marginTop: 2 }} onClick={editUserRole}>
              Изменить
            </Button>
          </Box>
        </Box>
      </Modal>
    </Card>
  )
}

export default UserCard;