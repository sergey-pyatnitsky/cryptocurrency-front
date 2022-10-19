import { Box, Typography, Grid, Divider } from '@mui/material'
import { CryptoState } from '../../../context/CryptoContext';
import { numberWithCommas } from '../../table/CoinsTable';

const CoinPriceStatistics = ({ coin }: any) => {
  const { currency, symbol } = CryptoState();

  let date = new Date(coin?.last_updated)
  return (
    <>
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
          <Box sx={{ fontWeight: 'bold' }}>{coin?.symbol.toUpperCase() + " Статистика Цены"}</Box>
        </Typography>
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={12}>
            <Grid container spacing={2} >
              <Grid item xs={6}>
                <Typography variant="subtitle2" sx={{ display: "flex", justifyContent: "flex-start" }}>
                  {"Цена " + coin?.name}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {symbol + " "}
                  {
                    numberWithCommas(
                      coin?.market_data.current_price[currency.toLowerCase()]
                    )
                  }
                </Typography>
              </Grid>
            </Grid>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2} >
              <Grid item xs={6}>
                <Typography variant="subtitle2" sx={{ display: "flex", justifyContent: "flex-start" }}>
                  Последнее обновление
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {
                    new Intl.DateTimeFormat('en-US', {
                      year: 'numeric', month: '2-digit', day: '2-digit',
                      hour: '2-digit', minute: '2-digit', second: '2-digit'
                    }).format(date)
                  }
                </Typography>
              </Grid>
            </Grid>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2} >
              <Grid item xs={6}>
                <Typography variant="subtitle2" sx={{ display: "flex", justifyContent: "flex-start" }}>
                  {"Изменение цены за 7д"}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Box sx={{
                    fontWeight: 'bold',
                    fontSize: 'h6.fontSize',
                    color: coin?.market_data.price_change_percentage_7d > 0 ? "rgb(14, 203, 129)" : "red"
                  }}>
                    {coin?.market_data.price_change_percentage_7d > 0 ? '+' : ''}
                    {(Math.round(coin?.market_data.price_change_percentage_7d * 10) / 10).toString() + "%"}
                  </Box>
                </Typography>
              </Grid>
            </Grid>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2} >
              <Grid item xs={6}>
                <Typography variant="subtitle2" sx={{ display: "flex", justifyContent: "flex-start" }}>
                  {"Изменение цены за 14д"}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Box sx={{
                    fontWeight: 'bold',
                    fontSize: 'h6.fontSize',
                    color: coin?.market_data.price_change_percentage_14d > 0 ? "rgb(14, 203, 129)" : "red"
                  }}>
                    {coin?.market_data.price_change_percentage_14d > 0 ? '+' : ''}
                    {(Math.round(coin?.market_data.price_change_percentage_14d * 10) / 10).toString() + "%"}
                  </Box>
                </Typography>
              </Grid>
            </Grid>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2} >
              <Grid item xs={6}>
                <Typography variant="subtitle2" sx={{ display: "flex", justifyContent: "flex-start" }}>
                  {"Изменение цены за 30д"}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Box sx={{
                    fontWeight: 'bold',
                    fontSize: 'h6.fontSize',
                    color: coin?.market_data.price_change_percentage_30d > 0 ? "rgb(14, 203, 129)" : "red"
                  }}>
                    {coin?.market_data.price_change_percentage_30d > 0 ? '+' : ''}
                    {(Math.round(coin?.market_data.price_change_percentage_30d * 10) / 10).toString() + "%"}
                  </Box>
                </Typography>
              </Grid>
            </Grid>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2} >
              <Grid item xs={6}>
                <Typography variant="subtitle2" sx={{ display: "flex", justifyContent: "flex-start" }}>
                  {"Изменение цены за 200д"}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Box sx={{
                    fontWeight: 'bold',
                    fontSize: 'h6.fontSize',
                    color: coin?.market_data.price_change_percentage_200d > 0 ? "rgb(14, 203, 129)" : "red"
                  }}>
                    {coin?.market_data.price_change_percentage_200d > 0 ? '+' : ''}
                    {(Math.round(coin?.market_data.price_change_percentage_200d * 10) / 10).toString() + "%"}
                  </Box>
                </Typography>
              </Grid>
            </Grid>
            <Divider />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default CoinPriceStatistics;