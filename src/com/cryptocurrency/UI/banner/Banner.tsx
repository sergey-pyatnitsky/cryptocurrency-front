import Carousel from "./Carousel";
import bannerImageDark from "../../assets/images/bannerDark.jpg"
import bannerImageWhite from "../../assets/images/bannerWhite.jpg"
import { Container, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useIntl } from 'react-intl';

function Banner() {
  const theme = useTheme();
  const intl = useIntl()

  return (
    <div style={{ backgroundImage: theme.palette.mode === 'dark' ? "url(" + bannerImageDark + ")" : "url(" + bannerImageWhite + ")" }}>
      <Container sx={{
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 5,
        justifyContent: "space-around",
      }}>
        <div style={{
          display: "flex",
          height: "40%",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
        }}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}
          >
            urCrypto*
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            {intl.formatMessage({ id: 'banner_text' })}
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
}

export default Banner;
