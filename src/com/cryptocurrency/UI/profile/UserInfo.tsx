import { Box, Card, Divider, Grid, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useIntl } from "react-intl";
import ErrorProps from "../../model/error";
import ProfileProps from "../../model/profile";
import ResponseProps from "../../model/response";
import UserService from "../../service/UserService";
import ChangePasswordModal from "./ChangePasswordModal";

interface IUserInfoProps {
  profileInfo: ProfileProps;
  setProfileInfo: React.Dispatch<React.SetStateAction<ProfileProps>>;
}

const UserInfo = (props: IUserInfoProps) => {
  const intl = useIntl();

  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [infoBlock, setInfoBlock] = useState<boolean>(true);

  const handleEditInfo = () => {
    if (!infoBlock) changeProfileInfo();
    setInfoBlock(!infoBlock);
  };

  const changeProfileInfo = () => {
    UserService.changeUserInfo(
      props.profileInfo,
      sessionStorage.getItem("username")
    )
      .then((resp: ResponseProps) => {
        console.log(resp);
      })
      .catch((err: ErrorProps) => {
        console.log(err);
      });
  };

  return (
    <>
      {infoBlock ? (
        <Card sx={{ height: 470 }}>
          <CardContent>
            <Typography gutterBottom variant="h5">
              <Box sx={{ fontWeight: "bold" }}>
                {intl.formatMessage({ id: "personal_info" })}
              </Box>
            </Typography>
          </CardContent>
          <CardContent>
            <Grid container>
              <Grid item xs={3}>
                <Typography gutterBottom variant="h6">
                  <Box sx={{ fontWeight: "bold" }}>
                    {intl.formatMessage({ id: "fullname" })}
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography gutterBottom variant="h6">
                  {props.profileInfo.name}
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ marginBottom: 1 }}>
                <Divider />
              </Grid>
              <Grid item xs={3}>
                <Typography gutterBottom variant="h6">
                  <Box sx={{ fontWeight: "bold" }}>
                    {intl.formatMessage({ id: "phone_number" })}
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography gutterBottom variant="h6">
                  {props.profileInfo.phone}
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ marginBottom: 1 }}>
                <Divider />
              </Grid>
              <Grid item xs={3}>
                <Typography gutterBottom variant="h6">
                  <Box sx={{ fontWeight: "bold" }}>
                    {intl.formatMessage({ id: "country" })}
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography gutterBottom variant="h6">
                  {props.profileInfo.country}
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ marginBottom: 1 }}>
                <Divider />
              </Grid>
              <Grid item xs={3}>
                <Typography gutterBottom variant="h6">
                  <Box sx={{ fontWeight: "bold" }}>
                    {intl.formatMessage({ id: "address" })}
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography gutterBottom variant="h6">
                  {props.profileInfo.address}
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ marginBottom: 1 }}>
                <Divider />
              </Grid>
              <Grid item xs={3}>
                <Typography gutterBottom variant="h6">
                  <Box sx={{ fontWeight: "bold" }}>
                    {intl.formatMessage({ id: "email" })}
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography gutterBottom variant="h6">
                  {props.profileInfo.email}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>

          <CardActions sx={{ marginLeft: "50%", marginTop: 4 }}>
            <Button size="small" variant="contained" onClick={handleEditInfo}>
              {infoBlock
                ? intl.formatMessage({ id: "edit_info" })
                : intl.formatMessage({ id: "save" })}
            </Button>
            <Button
              size="small"
              variant="contained"
              color="secondary"
              onClick={handleOpen}
            >
              {intl.formatMessage({ id: "changing_password" })}
            </Button>
          </CardActions>
        </Card>
      ) : (
        <Card sx={{ height: 470 }}>
          <CardContent>
            <Typography gutterBottom variant="h5">
              <Box sx={{ fontWeight: "bold" }}>
                {intl.formatMessage({ id: "changing_personal_information" })}
              </Box>
            </Typography>
          </CardContent>
          <CardContent>
            <Grid container>
              <Grid item xs={3}>
                <Typography gutterBottom variant="h6">
                  <Box sx={{ fontWeight: "bold" }}>
                    {intl.formatMessage({ id: "fullname" })}
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  id="name-input"
                  placeholder="Иванов Иван Иванович"
                  defaultValue={props.profileInfo.name}
                  // helperText="sdfsdf"
                  size="small"
                  sx={{ width: "500px", marginBottom: 1 }}
                  onChange={(e) =>
                    props.setProfileInfo({
                      ...props.profileInfo,
                      name: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sx={{ marginBottom: 1 }}>
                <Divider />
              </Grid>
              <Grid item xs={3}>
                <Typography gutterBottom variant="h6">
                  <Box sx={{ fontWeight: "bold" }}>
                    {intl.formatMessage({ id: "phone_number" })}
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  id="phone-input"
                  placeholder="+375(29)789-45-61"
                  defaultValue={props.profileInfo.phone}
                  size="small"
                  sx={{ width: "500px", marginBottom: 1 }}
                  onChange={(e) =>
                    props.setProfileInfo({
                      ...props.profileInfo,
                      phone: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sx={{ marginBottom: 1 }}>
                <Divider />
              </Grid>
              <Grid item xs={3}>
                <Typography gutterBottom variant="h6">
                  <Box sx={{ fontWeight: "bold" }}>
                    {intl.formatMessage({ id: "country" })}
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  id="country-input"
                  placeholder="Беларусь"
                  defaultValue={props.profileInfo.country}
                  size="small"
                  sx={{ width: "500px", marginBottom: 1 }}
                  onChange={(e) =>
                    props.setProfileInfo({
                      ...props.profileInfo,
                      country: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sx={{ marginBottom: 1 }}>
                <Divider />
              </Grid>
              <Grid item xs={3}>
                <Typography gutterBottom variant="h6">
                  <Box sx={{ fontWeight: "bold" }}>
                    {intl.formatMessage({ id: "address" })}
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  id="address-input"
                  placeholder="г.Минск пр-т. Независимости 42а"
                  defaultValue={props.profileInfo.address}
                  size="small"
                  sx={{ width: "500px", marginBottom: 1 }}
                  onChange={(e) =>
                    props.setProfileInfo({
                      ...props.profileInfo,
                      address: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sx={{ marginBottom: 1 }}>
                <Divider />
              </Grid>
              <Grid item xs={3}>
                <Typography gutterBottom variant="h6">
                  <Box sx={{ fontWeight: "bold" }}>
                    {intl.formatMessage({ id: "email" })}
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  id="email-input"
                  placeholder="qwerty@mail.ru"
                  defaultValue={props.profileInfo.email}
                  size="small"
                  sx={{ width: "500px", marginBottom: 1 }}
                  onChange={(e) =>
                    props.setProfileInfo({
                      ...props.profileInfo,
                      email: e.target.value,
                    })
                  }
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ marginLeft: "70%" }}>
            <Button size="small" variant="contained" onClick={handleEditInfo}>
              {infoBlock
                ? intl.formatMessage({ id: "edit_info" })
                : intl.formatMessage({ id: "save" })}
            </Button>
          </CardActions>
        </Card>
      )}
      <ChangePasswordModal open={open} handleClose={handleClose} />
    </>
  );
};

export default UserInfo;
