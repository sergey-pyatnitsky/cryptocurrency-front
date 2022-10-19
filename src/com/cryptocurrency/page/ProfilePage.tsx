import * as React from 'react';
import { Card, Grid, Box, Divider, TextField } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "30%",
  height: "55%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ProfilePage = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [image, setImage] = React.useState<string>("Файл не выбран")
  const [saveImage, setSaveImage] = React.useState<boolean>(false)
  const [infoBlock, setInfoBlock] = React.useState<boolean>(true)

  const [profileInfo, setProfileInfo] = React.useState({ name: '', email: '', phone: '', country: '', address: '' })

  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0].name);
      setSaveImage(true)
    }
  }

  const handleEditInfo = () => {
    setInfoBlock(!infoBlock)
  }

  return (
    <>
      <Grid container spacing={2} sx={{ marginTop: 10, width: "90%", marginLeft: "5%", margintRifht: "5%" }}>
        <Grid item xs={4}>
          <Card sx={{ height: 470 }}>
            <Grid container sx={{ display: "flex", justifyContent: "center" }}>
              <CardMedia
                component="img"
                alt="green iguana"
                image="https://mobimg.b-cdn.net/v3/fetch/b7/b76a766ef450b12d3f47b8d5dcd3b0bb.jpeg?w=1470&r=0.5625"
                sx={{
                  width: 250,
                  height: 250,
                  borderRadius: '50%',
                  marginTop: 1
                }}
              />
              <CardContent>
                <Typography variant="h5" sx={{ textAlign: "center" }}>
                  Иванов Иван Иванович
                </Typography>
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                  Беларусь
                </Typography>
              </CardContent>
              <CardActions sx={{ width: "100%", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  component="label"
                >
                  Выберите файл
                  <input type="file" hidden onChange={onImageChange} />
                </Button>
                <Typography sx={{ textAlign: "center", marginLeft: 1 }}>
                  {image}
                </Typography>
              </CardActions>
              {
                saveImage ?
                  (
                    <CardActions>
                      <Button size="small" variant="contained" color="secondary">Сохранить</Button>
                    </CardActions>
                  ) : null
              }
            </Grid>
          </Card>
        </Grid>

        <Grid item xs={8}>
          {
            infoBlock ? (
              <Card sx={{ height: 470 }}>
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    <Box sx={{ fontWeight: 'bold' }}>
                      Личная информация
                    </Box>
                  </Typography>
                </CardContent>
                <CardContent>
                  <Grid container>
                    <Grid item xs={3}>
                      <Typography gutterBottom variant="h6">
                        <Box sx={{ fontWeight: 'bold' }}>
                          ФИО
                        </Box>
                      </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography gutterBottom variant="h6">
                        Иванов Иван Иванович
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ marginBottom: 1 }}><Divider /></Grid>
                    <Grid item xs={3}>
                      <Typography gutterBottom variant="h6">
                        <Box sx={{ fontWeight: 'bold' }}>
                          Номер телефона
                        </Box>
                      </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography gutterBottom variant="h6">
                        +375(29)789-45-61
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ marginBottom: 1 }}><Divider /></Grid>
                    <Grid item xs={3}>
                      <Typography gutterBottom variant="h6">
                        <Box sx={{ fontWeight: 'bold' }}>
                          Страна
                        </Box>
                      </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography gutterBottom variant="h6">
                        Беларусь
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ marginBottom: 1 }}><Divider /></Grid>
                    <Grid item xs={3}>
                      <Typography gutterBottom variant="h6">
                        <Box sx={{ fontWeight: 'bold' }}>
                          Адрес
                        </Box>
                      </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography gutterBottom variant="h6">
                        г.Минск пр-т. Независимости 42а
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ marginBottom: 1 }}><Divider /></Grid>
                    <Grid item xs={3}>
                      <Typography gutterBottom variant="h6">
                        <Box sx={{ fontWeight: 'bold' }}>
                          Email
                        </Box>
                      </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography gutterBottom variant="h6">
                        qwerty@mail.ru
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>

                <CardActions sx={{ marginLeft: "50%", marginTop: 4 }}>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={handleEditInfo}
                  >
                    {infoBlock ? "Изменить информацию" : "Сохранить"}
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={handleOpen}
                  >
                    Изменение пароля
                  </Button>
                </CardActions>
              </Card>
            ) :
              (
                <Card sx={{ height: 470 }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5">
                      <Box sx={{ fontWeight: 'bold' }}>
                        Изменение личной информации
                      </Box>
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Grid container>
                      <Grid item xs={3}>
                        <Typography gutterBottom variant="h6">
                          <Box sx={{ fontWeight: 'bold' }}>
                            ФИО
                          </Box>
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <TextField
                          id="name-input"
                          placeholder="Иванов Иван Иванович"
                          defaultValue="Иванов Иван Иванович"
                          helperText="sdfsdf"
                          size="small"
                          sx={{ width: "500px", marginBottom: 1 }}
                          onChange={(e) => setProfileInfo({ ...profileInfo, name: e.target.value })}
                        />
                      </Grid>
                      <Grid item xs={12} sx={{ marginBottom: 1 }}><Divider /></Grid>
                      <Grid item xs={3}>
                        <Typography gutterBottom variant="h6">
                          <Box sx={{ fontWeight: 'bold' }}>
                            Номер телефона
                          </Box>
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <TextField
                          id="phone-input"
                          placeholder="+375(29)789-45-61"
                          defaultValue="+375(29)789-45-61"
                          size="small"
                          sx={{ width: "500px", marginBottom: 1 }}
                          onChange={(e) => setProfileInfo({ ...profileInfo, phone: e.target.value })}
                        />
                      </Grid>
                      <Grid item xs={12} sx={{ marginBottom: 1 }}><Divider /></Grid>
                      <Grid item xs={3}>
                        <Typography gutterBottom variant="h6">
                          <Box sx={{ fontWeight: 'bold' }}>
                            Страна
                          </Box>
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <TextField
                          id="country-input"
                          placeholder="Беларусь"
                          defaultValue="Беларусь"
                          size="small"
                          sx={{ width: "500px", marginBottom: 1 }}
                          onChange={(e) => setProfileInfo({ ...profileInfo, country: e.target.value })}
                        />
                      </Grid>
                      <Grid item xs={12} sx={{ marginBottom: 1 }}><Divider /></Grid>
                      <Grid item xs={3}>
                        <Typography gutterBottom variant="h6">
                          <Box sx={{ fontWeight: 'bold' }}>
                            Адрес
                          </Box>
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <TextField
                          id="address-input"
                          placeholder="г.Минск пр-т. Независимости 42а"
                          defaultValue="г.Минск пр-т. Независимости 42а"
                          size="small"
                          sx={{ width: "500px", marginBottom: 1 }}
                          onChange={(e) => setProfileInfo({ ...profileInfo, address: e.target.value })}
                        />
                      </Grid>
                      <Grid item xs={12} sx={{ marginBottom: 1 }}><Divider /></Grid>
                      <Grid item xs={3}>
                        <Typography gutterBottom variant="h6">
                          <Box sx={{ fontWeight: 'bold' }}>
                            Email
                          </Box>
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <TextField
                          id="email-input"
                          placeholder="qwerty@mail.ru"
                          defaultValue="qwerty@mail.ru"
                          size="small"
                          sx={{ width: "500px", marginBottom: 1 }}
                          onChange={(e) => setProfileInfo({ ...profileInfo, email: e.target.value })}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions sx={{ marginLeft: "70%" }}>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={handleEditInfo}
                    >
                      {infoBlock ? "Изменить информацию" : "Сохранить"}
                    </Button>
                  </CardActions>
                </Card>
              )
          }
        </Grid>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography gutterBottom variant="h5" sx={{ marginBottom: 3 }}>
            <Box sx={{ fontWeight: 'bold' }}>
              Изменение пароля
            </Box>
          </Typography>
          <Box>
            <TextField
              id="pass-input"
              helperText="Старый пароль"
              placeholder="@User123"
              defaultValue="@User123"
              sx={{ width: "100%", marginBottom: 1 }}
              onChange={(e) => setProfileInfo({ ...profileInfo, email: e.target.value })}
            />
            <TextField
              id="old-pass-input"
              helperText="Новый пароль"
              placeholder="@User123"
              defaultValue="@User123"
              sx={{ width: "100%", marginBottom: 1 }}
              onChange={(e) => setProfileInfo({ ...profileInfo, email: e.target.value })}
            />
            <TextField
              id="old-pass-input"
              helperText="Повторите новый пароль"
              placeholder="@User123"
              defaultValue="@User123"
              sx={{ width: "100%", marginBottom: 1 }}
              onChange={(e) => setProfileInfo({ ...profileInfo, email: e.target.value })}
            />
            <Button
              size="small"
              variant="contained"
              sx={{ marginLeft: "60%" }}
              onClick={handleClose}
            >
              Сохранить
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default ProfilePage;