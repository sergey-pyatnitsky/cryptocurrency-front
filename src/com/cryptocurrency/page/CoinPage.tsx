import ModeEditIcon from "@mui/icons-material/ModeEdit";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import StarBorderPurple500OutlinedIcon from "@mui/icons-material/StarBorderPurple500Outlined";
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { yellow } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";
import { CryptoState } from "../context/CryptoContext";
import CoinProps from "../model/coin";
import ErrorProps from "../model/error";
import ResponseProps from "../model/response";
import CoinService from "../service/CoinService";
import CustomAlert from "../UI/alert/CustomAlert";
import CoinTab from "../UI/coin/CoinTab";
import EditCoinModal from "../UI/coin/EditCoinModal";
import CoinDescription from "../UI/coin/header/CoinDescription";
import CoinMarketInfo from "../UI/coin/header/CoinMarketInfo";
import { numberWithCommas } from "../UI/table/CoinsTable";

interface ICoinPageProps {
  role: string | null;
}

const CoinPage = ({ role }: ICoinPageProps) => {
  const intl = useIntl();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [coin, setCoin] = useState<CoinProps>();

  const [favorite, setFavorite] = useState<boolean>(false);
  const [isInputPriceAlert, setInputPriceAlert] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const handleNumberChange = (e: any) => {
    const onlyNums = e.target.value.replace(/[^0-9.]/g, "");
    setInputValue(onlyNums);
  };

  const [priceAlert, setPriceAlert] = useState<boolean>(false);

  const [error, setError] = useState({ alertError: false });
  const [errorMsg, setErrorMsg] = useState("");

  const { currency, symbol } = CryptoState();

  //fetch coin info
  useEffect(() => {
    setLoading(true);
    CoinService.fetchSingleCoin(id, currency)
      .then((resp: ResponseProps) => {
        setCoin(resp.data);
        setLoading(false);
      })
      .catch((err: ErrorProps) => {
        console.log(err);
        setLoading(false);
      });
  }, [id, currency]);

  //fetch user coin info
  useEffect(() => {
    CoinService.fetchUserCoinInfo(id, sessionStorage.getItem("username"))
      .then((resp: ResponseProps) => {
        if (resp.status === 200) {
          setPriceAlert(true);
          setError({ alertError: false });
          setFavorite(resp.data.favorite);
          setPriceAlert(resp.data.existPriceAlert);
        }
      })
      .catch(() => {
        setFavorite(true);
        setPriceAlert(true);
      });
  }, [id, coin]);

  //Modal handlers
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // add favorite coin
  const handleFavorites = (coin_id: string | undefined) => {
    CoinService.addFavoriteCoin(coin_id, sessionStorage.getItem("username"))
      .then((resp: ResponseProps) => {
        if (resp.status === 200) setFavorite(true);
      })
      .catch((err: ErrorProps) => {
        if (err.response.status === 401) {
          setErrorMsg(
            intl.formatMessage({ id: "access_denied_auth_to_continue" })
          );
        } else {
          setErrorMsg(intl.formatMessage({ id: "error" }));
        }
        setError({ alertError: true });
      });
  };

  // add price alert
  const handlePriceAlert = () => {
    setInputPriceAlert(!isInputPriceAlert);
    CoinService.addPriceAlert(
      id,
      inputValue,
      sessionStorage.getItem("username"),
      currency
    )
      .then((resp: ResponseProps) => {
        if (resp.status === 200) {
          setPriceAlert(true);
          setError({ alertError: false });
        }
      })
      .catch((err: ErrorProps) => {
        console.log(err);
        if (err.response.status === 401) {
          setErrorMsg(
            intl.formatMessage({ id: "access_denied_auth_to_continue" })
          );
        } else {
          setErrorMsg(intl.formatMessage({ id: "error" }));
        }
        setError({ alertError: true });
      });
  };

  return (
    <>
      {loading || !coin ? (
        <LinearProgress style={{ backgroundColor: "gold" }} />
      ) : (
        <div style={{ marginLeft: 100, marginTop: 50, marginRight: 100 }}>
          <Grid container spacing={2} sx={{ width: 250 }}>
            <Grid item xs={2}>
              <img src={coin.image} alt={coin.name} height="30" />
            </Grid>
            <Grid item xs={10}>
              <Typography component={"div"} variant="h6">
                <Box sx={{ fontWeight: "bold" }}>
                  {coin.name + " (" + coin.symbol.toUpperCase() + ")"}
                  {role != null && role === "ADMIN" ? (
                    <>
                      <Button onClick={handleOpen} sx={{ minWidth: 0 }}>
                        <ModeEditIcon sx={{ marginLeft: 0.1, height: 20 }} />
                      </Button>
                      <EditCoinModal
                        open={open}
                        handleClose={handleClose}
                        coin={coin}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Box sx={{ fontWeight: "bold", fontSize: "h6.fontSize" }}>
                {symbol}
                {numberWithCommas(coin.coinMarket[0].currentPrice)}
                {"  "}
              </Box>
            </Grid>
            <Grid item xs={7}>
              <Box
                sx={{
                  fontWeight: "bold",
                  fontSize: "h6.fontSize",
                  color:
                    coin.coinMarket[0].marketCapChangePercentage24h > 0
                      ? "rgb(14, 203, 129)"
                      : "red",
                }}
              >
                {coin.coinMarket[0].marketCapChangePercentage24h > 0 ? "+" : ""}
                {(
                  Math.round(
                    coin.coinMarket[0].marketCapChangePercentage24h * 10
                  ) / 10
                ).toString() + "%"}
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ width: "40%", marginTop: 1 }}>
            <Grid item xs={12}>
              <Tooltip title={intl.formatMessage({ id: "add_price_alert" })}>
                {!isInputPriceAlert ? (
                  <Button
                    variant="outlined"
                    sx={{ height: 35, marginRight: 1 }}
                    onClick={() => setInputPriceAlert(!isInputPriceAlert)}
                    disabled={priceAlert}
                  >
                    <NotificationsActiveOutlinedIcon
                      sx={{ color: priceAlert ? yellow[900] : null }}
                    />
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outlined"
                      sx={{ height: 35, marginRight: 1 }}
                      onClick={handlePriceAlert}
                    >
                      {intl.formatMessage({ id: "save" })}
                    </Button>
                    <TextField
                      id="outlined-error-helper-text"
                      value={inputValue}
                      size="small"
                      label={intl.formatMessage({ id: "coins_table_column_2" })}
                      sx={{ width: "40%", marginRight: 1 }}
                      onChange={handleNumberChange}
                    />
                  </>
                )}
              </Tooltip>
              <Tooltip title={intl.formatMessage({ id: "add_to_favorite" })}>
                <Button
                  variant="outlined"
                  sx={{ height: 35, marginRight: 1 }}
                  onClick={() => handleFavorites(id)}
                  disabled={favorite}
                >
                  <StarBorderPurple500OutlinedIcon
                    sx={{ color: favorite ? yellow[900] : null }}
                  />
                </Button>
              </Tooltip>
            </Grid>
          </Grid>

          <Grid container spacing={1} sx={{ width: 400, marginTop: 2 }}>
            <Grid item xs={12}>
              <LinearProgress
                sx={{ width: 400, height: 10, borderRadius: 10 }}
                variant="determinate"
                value={
                  ((coin.coinMarket[0].currentPrice -
                    coin.coinMarket[0].low24h) /
                    (coin.coinMarket[0].high24h - coin.coinMarket[0].low24h)) *
                  100
                }
              />
            </Grid>
            <Grid item xs={5}>
              <Typography variant="subtitle2">
                {numberWithCommas(coin.coinMarket[0].low24h)}
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="subtitle2">24H Range</Typography>
            </Grid>
            <Grid item xs={2} alignItems="left">
              <Typography variant="subtitle2">
                {numberWithCommas(coin.coinMarket[0].high24h)}
              </Typography>
            </Grid>
          </Grid>

          <CoinMarketInfo coin={coin} />
          <CoinDescription coin={coin} />
          <CoinTab coin={coin} />
        </div>
      )}
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

export default CoinPage;
