import {Box, Typography} from "@mui/material";
import CoinProps from "../../../model/coin";
import {useIntl} from "react-intl";

interface ICoinDescriptionProps {
  coin: CoinProps
}

const CoinDescription = ({coin}: ICoinDescriptionProps) => {
  const intl = useIntl()

  let locale
  (localStorage.getItem('locale') == null)
    ? locale = "ru-RU"
    : locale = localStorage.getItem('locale')

  return (
    <div style={{marginTop: 15, marginBottom: 10}}>
      <Typography variant="h4">
        <Box sx={{fontWeight: 'bold'}}>{intl.formatMessage({id: 'info'})}</Box>
      </Typography>
      <Typography variant="subtitle1">
        {
          locale === "ru-RU" ? coin.ruDescription : coin.enDescription
        }
      </Typography>
    </div>
  )
}

export default CoinDescription;