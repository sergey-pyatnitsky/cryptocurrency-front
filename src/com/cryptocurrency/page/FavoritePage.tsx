import { LinearProgress, Typography, Grid, Box, Button, Tooltip } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../context/CryptoContext";
import CoinsTable, { numberWithCommas } from "../UI/table/CoinsTable";
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CoinMarketInfo from "../UI/coin/header/CoinMarketInfo";
import CoinDescription from "../UI/coin/header/CoinDescription";
import CoinTab from "../UI/coin/CoinTab";
import EditCoinModal from "../UI/coin/EditCoinModal";
import FavoritesCoinsTable from "../UI/table/FavoritesCoinsTable";

interface IPortfolioPageProps {
  userId: number
}

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

const FavoritesPage = ({ userId }: IPortfolioPageProps) => {
  return (
    <>
      <FavoritesCoinsTable />
    </>
  );
};

export default FavoritesPage;