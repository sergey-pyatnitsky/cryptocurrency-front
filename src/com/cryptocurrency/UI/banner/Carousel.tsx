import axios from "axios";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import {
  Link as RouterLink,
} from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../context/CryptoContext";
import { numberWithCommas } from "../table/CoinsTable";
import "react-alice-carousel/lib/alice-carousel.css";

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));

    console.log(data);
    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = trending.map((coin: any) => {
    let profit: any = coin?.price_change_percentage_24h >= 0;

    return (
      <Button component={RouterLink} to={`/coins/${coin.id}`}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
          textTransform: "uppercase",
          color: "white",
        }} >
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <Typography display="inline" color="text.primary">
          {coin?.symbol}&nbsp;
          <Typography display="inline"
            sx={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}>
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </Typography>
        </Typography>
        <Typography display="inline" color="text.secondary" sx={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </Typography>
      </Button>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div style={{
      height: "50%",
      display: "flex",
      alignItems: "center"
    }}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
  );
};

export default Carousel;
