import { LinearProgress, makeStyles, Typography, Grid, Box, Button, Tooltip, Divider } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../context/CryptoContext";
import CoinInfo from "../UI/coin/chart/CoinChart";
import { numberWithCommas } from "../UI/table/CoinsTable";
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';

import CoinMarketInfo from "../UI/coin/header/CoinMarketInfo";
import CoinDescription from "../UI/coin/header/CoinDescription";
import CoinChart from "../UI/coin/chart/CoinChart";
import CoinTab from "../UI/coin/CoinTab";

type mapWithStringKeyAndNumberValue = {
  [key: string]: number
};

interface ICoinProps {
  id: string
  name: string
  symbol: string
  description: {
    en: string
    ru: string
  }
  image: {
    small: string
  };
  market_data: {
    last_updated: string
    current_price: mapWithStringKeyAndNumberValue
    market_cap: mapWithStringKeyAndNumberValue
    market_cap_change_percentage_24h: number
    high_24h: mapWithStringKeyAndNumberValue
    low_24h: mapWithStringKeyAndNumberValue
    fully_diluted_valuation: mapWithStringKeyAndNumberValue
    total_supply: number
    max_supply: number
  }
  market_cap_rank: number
}

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState<ICoinProps>();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    console.log(data)
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  //   const clesses = {
  //     container: {
  //       display: "flex",
  //       // [theme.breakpoints.down("md")]: {
  //       //   flexDirection: "column",
  //       //   alignItems: "center",
  //       // },
  //     },
  //     sidebar: {
  //       width: "30%",
  //       // [theme.breakpoints.down("md")]: {
  //       //   width: "100%",
  //       // },
  //       display: "flex",
  //       flexDirection: "column",
  //       alignItems: "center",
  //       marginTop: 25,
  //       borderRight: "2px solid grey",
  //     },
  //     heading: {
  //       fontWeight: "bold",
  //       marginBottom: 20,
  //       fontFamily: "Montserrat",
  //     },
  //     description: {
  //       width: "100%",
  //       fontFamily: "Montserrat",
  //       padding: 25,
  //       paddingBottom: 15,
  //       paddingTop: 0,
  //       textAlign: "justify",
  //     },
  //     marketData: {
  //       alignSelf: "start",
  //       padding: 25,
  //       paddingTop: 10,
  //       width: "100%",
  //       // [theme.breakpoints.down("md")]: {
  //       //   display: "flex",
  //       //   justifyContent: "space-around",
  //       // },
  //       // [theme.breakpoints.down("sm")]: {
  //       //   flexDirection: "column",
  //       //   alignItems: "center",
  //       // },
  //       // [theme.breakpoints.down("xs")]: {
  //       //   alignItems: "start",
  //       // },
  //     },
  //   }



  //   // const classes = useStyles();

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;
  console.log(coin)
  return (
    <>
      <div style={{ marginLeft: 100, marginTop: 50, marginRight: 100 }}>
        <Grid container spacing={2} sx={{ width: 250 }}>
          <Grid item xs={2}>
            <img
              src={coin?.image.small}
              alt={coin?.name}
              height="30"
            />
          </Grid>
          <Grid item xs={10} >
            <Typography variant="h6" >
              <Box sx={{ fontWeight: 'bold' }}>{coin?.name + " (" + coin?.symbol.toUpperCase() + ")"}</Box>
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Box sx={{ fontWeight: 'bold', fontSize: 'h6.fontSize' }}>
              {symbol}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
              {"  "}
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Box sx={{
              fontWeight: 'bold',
              fontSize: 'h6.fontSize',
              color: coin?.market_data.market_cap_change_percentage_24h > 0 ? "rgb(14, 203, 129)" : "red"
            }}>
              {coin?.market_data.market_cap_change_percentage_24h > 0 ? '+' : ''}
              {Math.round(coin?.market_data.market_cap_change_percentage_24h).toString() + "%"}
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ width: 250, marginTop: 1 }}>
          <Grid item xs={12}>
            <Tooltip title="Add Price Alert">
              <Button variant="outlined" sx={{ height: 35, marginRight: 1 }}><NotificationsActiveOutlinedIcon /></Button>
            </ Tooltip>
            <Tooltip title="Add to Porfolio and track coin price">
              <Button variant="outlined" sx={{ height: 35, marginRight: 1 }}><StarBorderPurple500OutlinedIcon /></Button>
            </Tooltip>
          </Grid>
        </Grid>

        <Grid container spacing={1} sx={{ width: 400, marginTop: 2 }}>
          <Grid item xs={12}>
            <LinearProgress sx={{ width: 400, height: 10, borderRadius: 10 }} variant="determinate"
              value={(coin?.market_data.current_price[currency.toLowerCase()] - coin?.market_data.low_24h[currency.toLowerCase()])
                / (coin?.market_data.high_24h[currency.toLowerCase()] - coin?.market_data.low_24h[currency.toLowerCase()])
                * 100} />
          </Grid>
          <Grid item xs={5}>
            <Typography variant="subtitle2" >
              {numberWithCommas(
                coin?.market_data.low_24h[currency.toLowerCase()]
              )}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="subtitle2" >
              24H Range
            </Typography>
          </Grid>
          <Grid item xs={2} alignItems="left">
            <Typography variant="subtitle2" >
              {numberWithCommas(
                coin?.market_data.high_24h[currency.toLowerCase()]
              )}
            </Typography>
          </Grid>
        </Grid>


        <CoinMarketInfo coin={coin} />
        <CoinDescription coin={coin} />
        <CoinTab coin={coin} />
      </div>
    </>
  );
};

export default CoinPage;