import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import PortfolioAddModal from "../UI/portfolio/PortfolioAddModal";
import PortfolioCard from "../UI/portfolio/PortfolioCard";
import { CryptoState } from "../context/CryptoContext";
import ErrorProps from "../model/error";
import PortfolioProps from "../model/portfolio";
import ResponseProps from "../model/response";
import PortfolioService from "../service/PortfolioService";
import { numberWithCommas } from "../UI/table/CoinsTable";
import { useIntl } from "react-intl";

const PortfolioPage = () => {
  const intl = useIntl();

  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);

  const [portfolio, setPortfolio] = useState<PortfolioProps[]>([]);
  const [stat, setState] = useState({
    totalSum: 0,
    prevDayTotalSumChange: 0,
    prevDateChangePercentages: 0,
    totalProfitLoss: 0,
    totalProfitLossPercentages: 0,
  });

  const { currency, symbol } = CryptoState();

  const fetchPortfolio = () => {
    PortfolioService.fetchAllPortfolio(
      sessionStorage.getItem("username"),
      currency
    )
      .then((resp: ResponseProps) => {
        setPortfolio(resp.data);
      })
      .catch((err: ErrorProps) => {
        console.log(err);
      });
  };

  useEffect(() => fetchPortfolio(), [currency]);

  useEffect(() => CalculateStatData(), [portfolio]);

  const CalculateStatData = () => {
    let totalSum = 0;
    portfolio.map((item: any) => {
      totalSum =
        totalSum +
        item.portfolioCoins.reduce(
          (partialSum: number, portfolioCoin: any) =>
            partialSum +
            portfolioCoin.coin.coinMarket[0].currentPrice *
              portfolioCoin.quantity,
          0
        );
    });

    let cost = 0;
    portfolio.map((item: any) => {
      cost =
        cost +
        item.portfolioCoins.reduce(
          (partialSum: number, portfolioCoin: any) =>
            partialSum + portfolioCoin.buyPrice * portfolioCoin.quantity,
          0
        );
    });

    let totalProfitLoss = totalSum - cost;
    let totalProfitLossPercentages = cost / totalSum;

    let prevDayTotalSum = 0;
    portfolio.map((item: any) => {
      prevDayTotalSum =
        prevDayTotalSum +
        item.portfolioCoins.reduce(
          (partialSum: number, portfolioCoin: any) =>
            partialSum +
            (1 - portfolioCoin.coin.coinMarket[0].priceChangePercentage24h) *
              portfolioCoin.coin.coinMarket[0].currentPrice *
              portfolioCoin.quantity,
          0
        );
    });

    let prevDayTotalSumChange = totalSum - prevDayTotalSum;
    let prevDateChangePercentages = prevDayTotalSum / totalSum;

    setState({
      totalSum: totalSum,
      prevDayTotalSumChange: prevDayTotalSumChange,
      prevDateChangePercentages: prevDateChangePercentages,
      totalProfitLoss: totalProfitLoss,
      totalProfitLossPercentages: totalProfitLossPercentages,
    });
  };

  return (
    <div style={{ marginTop: "3%", marginLeft: "3%", marginRight: "3%" }}>
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={6}>
          <Typography variant="h5">
            <Box sx={{ fontWeight: "bold" }}>
              {intl.formatMessage({ id: "all_portfolios" })}
            </Box>
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", justifyContent: "end" }}>
          <Button variant="contained" onClick={handleOpenCreate}>
            {intl.formatMessage({ id: "create_portfolio" })}
          </Button>
          <PortfolioAddModal
            handleCloseCreate={handleCloseCreate}
            openCreate={openCreate}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ marginTop: 2, width: "40%" }}>
        <Grid item xs={4}>
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
            <Typography variant="inherit">
              {symbol}
              {numberWithCommas(Math.round(stat.totalSum * 100) / 100)}
            </Typography>
            <Typography variant="subtitle2">
              {intl.formatMessage({ id: "total_balance" })}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={4}>
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
            <Typography variant="inherit">
              {symbol}
              {numberWithCommas(
                Math.round(stat.prevDayTotalSumChange * 100) / 100
              )}
            </Typography>
            <Typography variant="subtitle2">
              {intl.formatMessage({ id: "portfolio_change_24h" }) + " ("}
              <Typography
                variant="inherit"
                display="inline"
                sx={{
                  color: stat.prevDateChangePercentages < 0 ? "red" : "green",
                }}
              >
                {stat.prevDateChangePercentages < 0 ? null : "+"}
                {Math.round(stat.prevDateChangePercentages * 100) / 100}
                {"%"}
              </Typography>
              {")"}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={4}>
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
            <Typography variant="inherit">
              {symbol +
                numberWithCommas(Math.round(stat.totalProfitLoss * 100) / 100)}
            </Typography>
            <Typography variant="subtitle2">
              {intl.formatMessage({ id: "total_profit" }) + " ("}
              {stat.totalProfitLoss > 0 ? (
                <Typography
                  variant="inherit"
                  display="inline"
                  sx={{ color: "rgb(14, 203, 129)" }}
                >
                  {"+"}
                  {Math.round(stat.totalProfitLossPercentages * 100) / 100}
                  {"%"}
                </Typography>
              ) : (
                <Typography
                  variant="inherit"
                  display="inline"
                  sx={{ color: "red" }}
                >
                  {"-"}
                  {Math.round(stat.totalProfitLossPercentages * 100) / 100}
                  {"%"}
                </Typography>
              )}
              {")"}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {portfolio.map((rowPortfolio: PortfolioProps, key: number) => {
        return (
          <PortfolioCard
            portfolio={portfolio[key]}
            fetchPortfolio={fetchPortfolio}
            key={rowPortfolio.id}
          />
        );
      })}
    </div>
  );
};

export default PortfolioPage;
