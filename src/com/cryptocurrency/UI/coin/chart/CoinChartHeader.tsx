import {
  Typography,
  Box
} from "@mui/material";
import { chartDays } from "../../../config/data";
import SelectButton from "../SelectButton";

const CoinChartHeader = (props: any) => {
  return (
    <>
      <Typography variant="h5" sx={{ marginLeft: 5 }}>
        <Box sx={{ fontWeight: 'bold' }}>Bitcoin Price Chart</Box>
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
              props.setflag(false);
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