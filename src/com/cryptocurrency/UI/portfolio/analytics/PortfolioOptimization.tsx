import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { Box, Button, Grid, LinearProgress, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useIntl } from "react-intl";
import { CryptoState } from "../../../context/CryptoContext";
import PortfolioAnalyticsProps from "../../../model/portfolioAnalytics";
import PortfolioAnalyticsDTOProps from "../../../model/portfolioAnalyticsDTO";
import PortfolioCoinProps from "../../../model/portfolioCoin";

interface IPortfolioProps {
  portfolioCoinArray: PortfolioCoinProps[];
  openAnalytics: boolean;
  loading: boolean;
  analytics: PortfolioAnalyticsProps;
  portfolioCoinDto: PortfolioAnalyticsDTOProps[];
}

const PortfolioOptimization = (props: IPortfolioProps) => {
  const intl = useIntl();
  const { symbol } = CryptoState();
  const [inputValue, setInputValue] = useState<string>("0");

  const handleNumberChange = (e: any) => {
    const onlyNums = e.target.value.replace(/[^0-9.]/g, "");
    setInputValue(onlyNums);
  };

  return (
    <>
      {props.loading ? (
        <LinearProgress style={{ backgroundColor: "gold" }} />
      ) : (
        <>
          <Box>
            <Typography variant="h6">
              <Box sx={{ fontWeight: "bold", marginBottom: 2 }}>
                {intl.formatMessage({
                  id: "optimized_currency_weights_in_portfolio",
                }) + ":"}
                <table
                  style={{
                    border: "2px solid black",
                    borderCollapse: "collapse",
                    fontSize: 25,
                    marginLeft: "20%",
                  }}
                >
                  <tr>
                    {props.portfolioCoinDto.map((item: any) => {
                      return (
                        <th
                          key={item.coinId}
                          style={{ border: "2px solid black" }}
                        >
                          {item.coinId}
                        </th>
                      );
                    })}
                  </tr>
                  {props.analytics.optimizedPortfolio.weights.map(
                    (item: number) => {
                      return (
                        <th style={{ border: "2px solid black" }}>
                          {Math.round(item * 100) / 100 + "%"}
                        </th>
                      );
                    }
                  )}
                </table>
              </Box>
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">
              <Grid container>
                <Grid item>
                  <Box sx={{ fontWeight: "bold", marginBottom: 2 }}>
                    {intl.formatMessage({ id: "total_portfolio_risk" }) + ":"}
                  </Box>
                </Grid>
                <Grid item sx={{ color: "red" }}>
                  {Math.round(
                    props.analytics.optimizedPortfolio.volatility * 100
                  ) /
                    100 +
                    "%"}
                </Grid>
              </Grid>
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">
              <Grid container>
                <Grid item>
                  <Box sx={{ fontWeight: "bold", marginBottom: 2 }}>
                    {intl.formatMessage({ id: "total_portfolio_return" }) + ":"}
                  </Box>
                </Grid>
                <Grid
                  item
                  sx={{
                    color:
                      props.analytics.optimizedPortfolio.meanReturn > 0
                        ? "green"
                        : "red",
                  }}
                >
                  {Math.round(
                    props.analytics.optimizedPortfolio.meanReturn * 100
                  ) /
                    100 +
                    "%"}
                </Grid>
              </Grid>
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">
              <Grid container>
                <Grid item>
                  <Box
                    sx={{ fontWeight: "bold", marginBottom: 2, marginTop: 3 }}
                  >
                    {intl.formatMessage({
                      id: "enter_desired_investment_amount",
                    }) + ":"}
                  </Box>
                </Grid>
                <Grid item>
                  <TextField
                    variant="outlined"
                    onChange={handleNumberChange}
                    value={inputValue}
                    sx={{
                      paddingTop: 2,
                      paddingBottom: 2,
                      paddingLeft: 2,
                      fieldset: {
                        paddingLeft: (theme) => theme.spacing(2.5),
                        borderRadius: "30px",
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Typography>
          </Box>
          <Box>
            <Button sx={{ height: 50, marginLeft: "40%" }}>
              <KeyboardDoubleArrowDownIcon />
            </Button>
          </Box>
          <Box>
            <table
              style={{
                borderCollapse: "collapse",
                fontSize: 25,
                marginLeft: "30%",
              }}
            >
              <tr>
                <th style={{ borderBottom: "2px solid black" }}></th>
                <th
                  style={{
                    borderBottom: "2px solid black",
                    borderLeft: "2px solid black",
                  }}
                >
                  Количество
                </th>
              </tr>
              {props.portfolioCoinDto.map(
                (item: { keyNumber: number; coinId: string }) => {
                  return (
                    <tr key={item.coinId}>
                      <td style={{ borderRight: "2px solid black" }}>
                        {item.coinId}
                      </td>
                      <td>
                        {Number(
                          props.analytics.optimizedPortfolio.weights[
                            item.keyNumber
                          ]
                        ) * Number(inputValue)}
                        {" " + symbol}
                      </td>
                    </tr>
                  );
                }
              )}
            </table>
          </Box>
        </>
      )}
    </>
  );
};

export default PortfolioOptimization;
