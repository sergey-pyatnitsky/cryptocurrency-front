import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { CryptoState } from "../../context/CryptoContext";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import CoinProps from "../../model/coin";
import { useIntl } from "react-intl";

interface ICoinConverterProps {
  coin: CoinProps;
}

const CoinConverter = ({ coin }: ICoinConverterProps) => {
  const intl = useIntl();

  const [inputValue, setInputValue] = useState<string>();
  const [outputValue, setOutputValue] = useState<string>();
  const { currency, symbol } = CryptoState();

  const handleNumberChange = (e: any) => {
    const onlyNums = e.target.value.replace(/[^0-9.]/g, "");
    setInputValue(onlyNums);
    handleConverterChange(onlyNums);
  };

  const handleConverterChange = (number: string) => {
    number !== ""
      ? setOutputValue(
          Math.round(
            (Number(number) * coin.coinMarket[0].currentPrice * 100) / 100
          ).toString() +
            " " +
            symbol
        )
      : setOutputValue("");
  };

  let date = new Date(coin.coinMarket[0].lastUpdated);

  return (
    <>
      <Typography
        variant="h5"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Box sx={{ fontWeight: "bold" }}>
          {coin.name +
            " " +
            intl.formatMessage({ id: "coin_to" }) +
            " " +
            currency}
        </Box>
      </Typography>
      <Box
        sx={{
          boxShadow: 0,
          width: "100%",
          height: "100%",
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#808080 " : "#C0C0C0",
          color: (theme) =>
            theme.palette.mode === "dark" ? "grey.300" : "grey.800",
          p: 1,
          m: 1,
          borderRadius: 2,
          textAlign: "center",
          fontSize: "1rem",
          fontWeight: "700",
        }}
      >
        <TextField
          variant="outlined"
          onChange={handleNumberChange}
          value={inputValue}
          sx={{
            paddingTop: 2,
            paddingBottom: 2,
            fieldset: {
              paddingLeft: (theme) => theme.spacing(2.5),
              borderRadius: "30px",
            },
          }}
        />
        <Button sx={{ height: 50, marginTop: 2, marginBottom: 2 }}>
          <CompareArrowsIcon />
        </Button>
        <TextField
          variant="outlined"
          value={outputValue}
          sx={{
            paddingTop: 2,
            paddingBottom: 2,
            fieldset: {
              paddingLeft: (theme) => theme.spacing(2.5),
              borderRadius: "30px",
            },
          }}
        />
        <Typography variant="h6">
          <Box
            sx={{ display: "flex", justifyConent: "left", fontWeight: "bold" }}
          >
            {"1 " +
              coin.symbol.toUpperCase() +
              " = " +
              symbol +
              coin.coinMarket[0].currentPrice}
            <Box sx={{ display: "flex", justifyConent: "top", fontSize: 12 }}>
              {intl.formatMessage({ id: "coin_info_last_updated" }) + "  "}
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }).format(date)}
            </Box>
          </Box>
        </Typography>
      </Box>
    </>
  );
};

export default CoinConverter;
