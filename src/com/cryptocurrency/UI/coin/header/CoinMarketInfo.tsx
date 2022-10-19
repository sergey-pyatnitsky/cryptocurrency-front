import { Typography, Grid, Tooltip, Divider } from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { numberWithCommas } from "../../table/CoinsTable";
import { CryptoState } from "../../../context/CryptoContext";

const CoinMarketInfo = ({ coin }: any) => {
  const { currency, symbol } = CryptoState();
  return (
    <>
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={6}>
          <Grid container spacing={2} >
            <Grid item xs={6}>
              <Typography variant="subtitle2" sx={{ display: "flex", justifyContent: "flex-start" }}>
                Рыночная капитализация
                <Tooltip title="Market Cap = Current Price x Circulating Supply. Refers to the total market value of 
                  a cryptocurrency’s circulating supply. It is similar to the stock market’s measurement of multiplying 
                  price per share by shares readily available in the market (not held & locked by insiders, governments)">
                  <HelpOutlineIcon />
                </Tooltip>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" sx={{ display: "flex", justifyContent: "flex-end" }}>
                {symbol + " "}
                {
                  numberWithCommas(
                    coin?.market_data.market_cap[currency.toLowerCase()]
                  )
                }
              </Typography>
            </Grid>
          </Grid>
          <Divider />
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={2} >
            <Grid item xs={6}>
              <Typography variant="subtitle2" sx={{ display: "flex", justifyContent: "flex-start" }}>
                В обращении
                <Tooltip title="Количество монет, которые выпущены в публичное обращение. 
                  Сравните с доступными на рынке акциями, которые не находятся во владении инсайдеров и правительств.">
                  <HelpOutlineIcon />
                </Tooltip>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" sx={{ display: "flex", justifyContent: "flex-end" }}>
                {symbol + " "}
                {
                  numberWithCommas(
                    coin?.market_data.market_cap[currency.toLowerCase()]
                  )
                }
              </Typography>
            </Grid>
          </Grid>
          <Divider />
        </Grid>


        <Grid item xs={6}>
          <Grid container spacing={2} >
            <Grid item xs={6}>
              <Typography variant="subtitle2" sx={{ display: "flex", justifyContent: "flex-start" }}>
                Общее предложение
                <Tooltip title="Количество уже созданных монет, за исключением тех, что были сожжены (убраны из обращения). 
                  Сравните с количеством акций, выпущенных в обращение.Общий объем предложения = объем предложения ончейн – сожженные токены">
                  <HelpOutlineIcon />
                </Tooltip>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" sx={{ display: "flex", justifyContent: "flex-end" }}>
                {coin?.market_data.total_supply}
              </Typography>
            </Grid>
          </Grid>
          <Divider />
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={2} >
            <Grid item xs={6}>
              <Typography variant="subtitle2" sx={{ display: "flex", justifyContent: "flex-start" }}>
                Полностью разбавленная капитализация
                <Tooltip title="FDV = текущая цена x максимальное количество монет. Это рыночная капитализация при условии, 
                  что в обращение выпущено максимальное количество монет. Показатель FDV достигается за 3, 5, 10 
                  или более лет, в зависимости от графика выпуска.">
                  <HelpOutlineIcon />
                </Tooltip>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" sx={{ display: "flex", justifyContent: "flex-end" }}>
                {symbol + " "}
                {
                  numberWithCommas(
                    Number(coin?.market_data.fully_diluted_valuation[currency.toLowerCase()]))
                }
              </Typography>
            </Grid>
          </Grid>
          <Divider />
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={2} >
            <Grid item xs={6}>
              <Typography variant="subtitle2" sx={{ display: "flex", justifyContent: "flex-start" }}>
                Максимальный объем
                <Tooltip title="Максимальное количество монет, прописанное в коде блокчейна. Его можно сравнить с 
                  максимальным количеством акций, которые можно выпустить на рынок. Максимальное количество монет = теоретический максимум, прописанный в коде">
                  <HelpOutlineIcon />
                </Tooltip>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" sx={{ display: "flex", justifyContent: "flex-end" }}>
                {coin?.market_data.max_supply}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Divider />
      </Grid>
    </>
  )
}

export default CoinMarketInfo;