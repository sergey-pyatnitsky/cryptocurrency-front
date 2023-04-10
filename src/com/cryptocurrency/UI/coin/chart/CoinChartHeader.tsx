import {Box, Typography} from "@mui/material";
import {chartDays} from "../../../config/data";
import SelectButton from "../SelectButton";
import {useIntl} from "react-intl";

interface ICoinChartHeaderProps {
  coinName: string
  days: number
  setDays: any
  setFlag: any
}

const CoinChartHeader = (props: ICoinChartHeaderProps) => {
  const intl = useIntl()

  return (
    <>
      <Typography component={'div'} variant="h5" sx={{marginLeft: 5}}>
        <Box sx={{fontWeight: 'bold'}}>{props.coinName + " " + intl.formatMessage({id: 'price_chart'})} </Box>
      </Typography>
      <div
        style={{
          display: "flex",
          marginRight: "30%",
          justifyContent: "end",
        }}
      >
        {chartDays.map((day) => (
          <SelectButton
            key={day.value}
            onClick={() => {
              props.setDays(day.value);
              props.setFlag(false);
            }}
            selected={day.value === props.days}
          >
            {day.label}
          </SelectButton>
        ))}
      </div>
    </>
  )
}

export default CoinChartHeader;