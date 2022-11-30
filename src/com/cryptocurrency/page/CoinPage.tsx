import { LinearProgress, Typography, Grid, Box, Button, Tooltip } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../context/CryptoContext";
import { numberWithCommas } from "../UI/table/CoinsTable";
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CoinMarketInfo from "../UI/coin/header/CoinMarketInfo";
import CoinDescription from "../UI/coin/header/CoinDescription";
import CoinTab from "../UI/coin/CoinTab";
import EditCoinModal from "../UI/coin/EditCoinModal";

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

interface ICoinPageProps {
  role: string | null
}

const CoinPage = ({ role }: ICoinPageProps) => {
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

  //Modal handlers
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
              <Box sx={{ fontWeight: 'bold' }}
              >
                {coin?.name + " (" + coin?.symbol.toUpperCase() + ")"}
                {
                  role != null && role == 'ADMIN'
                    ? (
                      <>
                        <Button
                          onClick={handleOpen}
                          sx={{ minWidth: 0 }}
                        >
                          <ModeEditIcon sx={{ marginLeft: 0.1, height: 20 }} />
                        </Button>
                        <EditCoinModal open={open} handleClose={handleClose} coin={coin} />
                      </>
                    ) : (<></>)
                }
              </Box>
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
              <Button variant="outlined" sx={{ height: 35, marginRight: 1 }}
              >
                <NotificationsActiveOutlinedIcon />
              </Button>
            </ Tooltip>
            <Tooltip title="Add to Porfolio and track coin price">
              <Button variant="outlined" sx={{ height: 35, marginRight: 1 }}
              >
                <StarBorderPurple500OutlinedIcon />
              </Button>
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