import {Box, CircularProgress, Divider, Grid, Typography} from '@mui/material'
import {CryptoState} from '../../../context/CryptoContext';
import {numberWithCommas} from '../../table/CoinsTable';
import CoinProps from "../../../model/coin";
import {useEffect, useState} from "react";
import CoinService from "../../../service/CoinService";
import ResponseProps from "../../../model/response";
import ErrorProps from "../../../model/error";
import {useIntl} from "react-intl";

interface ICoinPriceStatisticsProps {
  coin: CoinProps
}

const CoinPriceStatistics = ({coin}: ICoinPriceStatisticsProps) => {
  const intl = useIntl()
  const {currency, symbol} = CryptoState();
  const [coinGeskoMarketData, setCoinGeskoMarketData] = useState<any>()

  useEffect(() => {
    CoinService.fetchSingleCoinFromGesko(coin.id)
      .then((resp: ResponseProps) => {
        setCoinGeskoMarketData(resp.data.market_data)
      })
      .catch((err: ErrorProps) => {
        console.log(err)
      });
  }, [coin.id, currency]);

  let date = new Date(coin.coinMarket[0].lastUpdated)
  return (
    <>
      {
        coinGeskoMarketData !== undefined
          ? (
            <Box
              sx={{
                boxShadow: 0,
                width: '100%',
                height: '100%',
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#808080 ' : '#C0C0C0'),
                color: (theme) =>
                  theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                p: 1,
                m: 1,
                borderRadius: 2,
                textAlign: 'center',
                fontSize: '1rem',
                fontWeight: '700',
              }}
            >
              <Typography variant="h5">
                <Box sx={{fontWeight: 'bold'}}>
                  {coin?.symbol.toUpperCase() + " " + intl.formatMessage({id: 'price_statistics'})}
                </Box>
              </Typography>
              <Grid container spacing={2} sx={{marginTop: 2}}>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" sx={{display: "flex", justifyContent: "flex-start"}}>
                        {intl.formatMessage({id: 'coins_table_column_2'}) + " " + coin?.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" sx={{display: "flex", justifyContent: "flex-end"}}>
                        {symbol + " "}
                        {numberWithCommas(coin.coinMarket[0].currentPrice)}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider/>
                </Grid>

                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" sx={{display: "flex", justifyContent: "flex-start"}}>
                        {intl.formatMessage({id: 'coin_info_last_updated'})}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" sx={{display: "flex", justifyContent: "flex-end"}}>
                        {
                          new Intl.DateTimeFormat('en-US', {
                            year: 'numeric', month: '2-digit', day: '2-digit',
                            hour: '2-digit', minute: '2-digit', second: '2-digit'
                          }).format(date)
                        }
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider/>
                </Grid>

                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" sx={{display: "flex", justifyContent: "flex-start"}}>
                        {intl.formatMessage({id: 'coin_price_change_7d'})}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" sx={{display: "flex", justifyContent: "flex-end"}}>
                        <Box
                          sx={{
                            fontWeight: 'bold',
                            fontSize: 'h6.fontSize',
                            color: coinGeskoMarketData.price_change_percentage_7d > 0 ? "rgb(14, 203, 129)" : "red"
                          }}
                        >
                          {coinGeskoMarketData.price_change_percentage_7d > 0 ? '+' : ''}
                          {(Math.round(coinGeskoMarketData.price_change_percentage_7d * 10) / 10).toString() + "%"}
                        </Box>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider/>
                </Grid>

                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" sx={{display: "flex", justifyContent: "flex-start"}}>
                        {intl.formatMessage({id: 'coin_price_change_14d'})}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" sx={{display: "flex", justifyContent: "flex-end"}}>
                        <Box
                          sx={{
                            fontWeight: 'bold',
                            fontSize: 'h6.fontSize',
                            color: coinGeskoMarketData.price_change_percentage_14d > 0 ? "rgb(14, 203, 129)" : "red"
                          }}
                        >
                          {coinGeskoMarketData.price_change_percentage_14d > 0 ? '+' : ''}
                          {(Math.round(coinGeskoMarketData.price_change_percentage_14d * 10) / 10).toString() + "%"}
                        </Box>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider/>
                </Grid>

                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" sx={{display: "flex", justifyContent: "flex-start"}}>
                        {intl.formatMessage({id: 'coin_price_change_30d'})}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" sx={{display: "flex", justifyContent: "flex-end"}}>
                        <Box
                          sx={{
                            fontWeight: 'bold',
                            fontSize: 'h6.fontSize',
                            color: coinGeskoMarketData.price_change_percentage_30d > 0 ? "rgb(14, 203, 129)" : "red"
                          }}
                        >
                          {coinGeskoMarketData.price_change_percentage_30d > 0 ? '+' : ''}
                          {(Math.round(coinGeskoMarketData.price_change_percentage_30d * 10) / 10).toString() + "%"}
                        </Box>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider/>
                </Grid>

                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" sx={{display: "flex", justifyContent: "flex-start"}}>
                        {intl.formatMessage({id: 'coin_price_change_200d'})}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" sx={{display: "flex", justifyContent: "flex-end"}}>
                        <Box sx={{
                          fontWeight: 'bold',
                          fontSize: 'h6.fontSize',
                          color: coinGeskoMarketData.price_change_percentage_200d > 0 ? "rgb(14, 203, 129)" : "red"
                        }}>
                          {coinGeskoMarketData.price_change_percentage_200d > 0 ? '+' : ''}
                          {(Math.round(coinGeskoMarketData.price_change_percentage_200d * 10) / 10).toString() + "%"}
                        </Box>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider/>
                </Grid>
              </Grid>
            </Box>
          )
          : (
            <CircularProgress
              style={{color: "gold"}}
              size={250}
              thickness={1}
            />
          )
      }
    </>
  )
}

export default CoinPriceStatistics;