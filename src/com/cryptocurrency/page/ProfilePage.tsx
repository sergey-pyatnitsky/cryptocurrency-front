import { Card, Grid, LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import ErrorProps from "../model/error";
import ProfileProps from "../model/profile";
import ResponseProps from "../model/response";
import UserService from "../service/UserService";
import ProfileImage from "../UI/profile/ProfileImage";
import UserInfo from "../UI/profile/UserInfo";

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [profileInfo, setProfileInfo] = useState<ProfileProps>(
    {} as ProfileProps
  );

  useEffect(() => {
    setLoading(true);
    fetchProfileInfo();
  }, []);

  const fetchProfileInfo = () => {
    UserService.fetchProfileInfo(sessionStorage.getItem("username"))
      .then((resp: ResponseProps) => setProfileInfo(resp.data))
      .catch((err: ErrorProps) => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    <>
      {loading ? (
        <LinearProgress style={{ backgroundColor: "gold" }} />
      ) : (
        <Grid
          container
          spacing={2}
          sx={{
            marginTop: 10,
            width: "90%",
            marginLeft: "5%",
            margintRifht: "5%",
          }}
        >
          <Grid item xs={4}>
            <Card sx={{ height: 470 }}>
              <Grid
                container
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <ProfileImage profileInfo={profileInfo} />
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={8}>
            <UserInfo
              profileInfo={profileInfo}
              setProfileInfo={setProfileInfo}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ProfilePage;
