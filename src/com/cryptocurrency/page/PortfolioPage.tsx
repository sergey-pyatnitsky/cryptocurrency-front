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
import PortfolioCoin from "../model/portfolioCoin";

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

  const fetchPortfolio = (currency:string) => {
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

  useEffect(() => fetchPortfolio(currency), [currency]);

  useEffect(() => CalculateStatData(portfolio), [portfolio]);

  const CalculateStatData = (portfolio:PortfolioProps[]) => {
    let totalSum = portfolio.reduce(
        (portfolio_sum :number, portfolio:PortfolioProps) => portfolio_sum +
            portfolio.portfolioCoins.reduce(
                (partialSum:number, portfolio_coin:PortfolioCoin) => partialSum +
                    portfolio_coin.coin.coinMarket[0].currentPrice *
                    portfolio_coin.quantity
                , 0)
        , 0);

    let cost = portfolio.reduce(
        (portfolio_sum :number, portfolio:PortfolioProps) => portfolio_sum +
            portfolio.portfolioCoins.reduce(
                (portfolio_coin_sum:number, portfolio_coin:PortfolioCoin) => portfolio_coin_sum +
                    portfolio_coin.buyPrice*portfolio_coin.quantity, 0)
        , 0);

    let totalProfitLoss = totalSum - cost;
    let totalProfitLossPercentages = cost / totalSum;

    let prevDayTotalSum = portfolio.reduce(
        (portfolio_sum :number, portfolio:PortfolioProps) => portfolio_sum +
            portfolio.portfolioCoins.reduce(
                (partialSum:number, portfolio_coin:PortfolioCoin) => partialSum +
                    (1 - portfolio_coin.coin.coinMarket[0].priceChangePercentage24h) *
                    portfolio_coin.coin.coinMarket[0].currentPrice *
                    portfolio_coin.quantity
                , 0)
        , 0);

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
            fetchPortfolio={()=>fetchPortfolio(currency)}
            key={rowPortfolio.id}
          />
        );
      })}
    </div>
  );
};

export default PortfolioPage;
