import {Divider, Grid, Tooltip, Typography} from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {numberWithCommas} from "../../table/CoinsTable";
import {CryptoState} from "../../../context/CryptoContext";
import CoinProps from "../../../model/coin";
import {useIntl} from "react-intl";

interface ICoinMarketInfoProps {
  coin: CoinProps
}

const CoinMarketInfo = ({coin}: ICoinMarketInfoProps) => {
  const intl = useIntl()
  const {symbol} = CryptoState();
  return (
    <>
      <Grid container spacing={2} sx={{marginTop: 2}}>
        <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="subtitle2" sx={{display: "flex", justifyContent: "flex-start"}}>
                {intl.formatMessage({id: 'market_cap'})}
                <Tooltip title={intl.formatMessage({id: 'market_cap_info'})}>
                  <HelpOutlineIcon/>
                </Tooltip>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" sx={{display: "flex", justifyContent: "flex-end"}}>
                {symbol + " "}
                {
                  numberWithCommas(coin.coinMarket[0].marketCap)
                }
              </Typography>
            </Grid>
          </Grid>
          <Divider/>
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="subtitle2" sx={{display: "flex", justifyContent: "flex-start"}}>
                {intl.formatMessage({id: 'circulating_supply'})}
                <Tooltip title={intl.formatMessage({id: 'circulating_supply_info'})}>
                  <HelpOutlineIcon/>
                </Tooltip>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" sx={{display: "flex", justifyContent: "flex-end"}}>
                {symbol + " "}
                {
                  numberWithCommas(coin.coinMarket[0].marketCap)
                }
              </Typography>
            </Grid>
          </Grid>
          <Divider/>
        </Grid>


        <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="subtitle2" sx={{display: "flex", justifyContent: "flex-start"}}>
                {intl.formatMessage({id: 'total_supply'})}
                <Tooltip title={intl.formatMessage({id: 'total_supply_info'})}>
                  <HelpOutlineIcon/>
                </Tooltip>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" sx={{display: "flex", justifyContent: "flex-end"}}>
                {coin.coinMarket[0].totalSupply}
              </Typography>
            </Grid>
          </Grid>
          <Divider/>
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="subtitle2" sx={{display: "flex", justifyContent: "flex-start"}}>
                {intl.formatMessage({id: 'fully_diluted_valuation'})}
                <Tooltip title={intl.formatMessage({id: 'fully_diluted_valuation_info'})}>
                  <HelpOutlineIcon/>
                </Tooltip>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" sx={{display: "flex", justifyContent: "flex-end"}}>
                {symbol + " "}
                {
                  numberWithCommas(coin.coinMarket[0].fullyDilutedValuation)
                }
              </Typography>
            </Grid>
          </Grid>
          <Divider/>
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="subtitle2" sx={{display: "flex", justifyContent: "flex-start"}}>
                {intl.formatMessage({id: 'max_supply'})}
                <Tooltip title={intl.formatMessage({id: 'max_supply_info'})}>
                  <HelpOutlineIcon/>
                </Tooltip>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" sx={{display: "flex", justifyContent: "flex-end"}}>
                {coin.coinMarket[0].maxSupply}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Divider/>
      </Grid>
    </>
  )
}

export default CoinMarketInfo;