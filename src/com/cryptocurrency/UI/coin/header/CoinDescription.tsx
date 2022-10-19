import { Typography, Box } from "@mui/material";
import ReactHtmlParser from "react-html-parser";

const CoinDescription = ({ coin }: any) => {
  return (
    <div style={{ marginTop: 15, marginBottom: 10 }}>
      <Typography variant="h4">
        <Box sx={{ fontWeight: 'bold' }}>Информация</Box>
      </Typography>
      <Typography variant="subtitle1">
        {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
      </Typography >
    </div>
  )
}

export default CoinDescription;