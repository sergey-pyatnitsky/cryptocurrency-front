import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import ErrorProps from "../../model/error";
import ProfileProps from "../../model/profile";
import ResponseProps from "../../model/response";
import {
  API_BASE_URL,
  API_DOWNLOAD_PROFILE_IMAGE_URL,
  USER_IMAGE_ID,
} from "../../service/CommonService";
import UserService from "../../service/UserService";
import loadingGif from "../../assets/images/loading.gif";

interface IProfileImageProps {
  profileInfo: ProfileProps;
}

const ProfileImage = ({ profileInfo }: IProfileImageProps) => {
  const intl = useIntl();
  const [imageName, setImageName] = useState<string>(
    intl.formatMessage({ id: "file_not_selected" })
  );
  const [imageUrl, setImageUrl] = useState<string>();
  const [image, setImage] = useState<Blob>();
  const [saveImage, setSaveImage] = useState<boolean>(false);

  useEffect(() => {
    setImageUrl(
      API_BASE_URL + API_DOWNLOAD_PROFILE_IMAGE_URL + profileInfo.imageId
    );
    sessionStorage.setItem(USER_IMAGE_ID, profileInfo.imageId);
  }, [profileInfo]);

  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setImageName(event.target.files[0].name);
      setImage(event.target.files[0]);
      setSaveImage(true);
    }
  };

  const saveProfileImage = () => {
    if (image !== undefined) {
      UserService.saveProfileImage(image, sessionStorage.getItem("username"))
        .then((resp: ResponseProps) => {
          setImageUrl(
            API_BASE_URL + API_DOWNLOAD_PROFILE_IMAGE_URL + resp.data
          );
          setImageName(intl.formatMessage({ id: "file_not_selected" }));
          setSaveImage(false);
          sessionStorage.setItem(USER_IMAGE_ID, resp.data);
        })
        .catch((err: ErrorProps) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <CardMedia
        component="img"
        alt="Profile Image"
        image={imageUrl === undefined ? loadingGif : imageUrl}
        sx={{
          width: 250,
          height: 250,
          borderRadius: "50%",
          marginTop: 1,
        }}
      />
      <CardContent>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          {profileInfo.name}
        </Typography>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          {profileInfo.country}
        </Typography>
      </CardContent>
      <CardActions sx={{ width: "100%", justifyContent: "center" }}>
        <Button variant="contained" component="label">
          {intl.formatMessage({ id: "select_file" })}
          <input type="file" hidden onChange={onImageChange} />
        </Button>
        <Typography sx={{ textAlign: "center", marginLeft: 1 }}>
          {imageName}
        </Typography>
      </CardActions>
      {saveImage ? (
        <CardActions>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={saveProfileImage}
          >
            {intl.formatMessage({ id: "save" })}
          </Button>
        </CardActions>
      ) : null}
    </>
  );
};

export default ProfileImage;
