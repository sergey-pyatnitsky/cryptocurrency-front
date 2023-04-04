import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CryptoState } from "../../context/CryptoContext";
import PortfolioProps from "../../model/portfolio";
import PieChart from "../table/PieChart";
import AddCoinPortfolioModal from "./AddCoinPortfolioModal";
import AnalyticsModal from "./analytics/AnalyticsModal";
import PortfolioCoinTable, { numberWithCommas } from "./PortfolioCoinTable";
import { useIntl } from "react-intl";

interface IPortfolioProps {
  portfolio: PortfolioProps;
  fetchPortfolio: () => void;
}

const PortfolioCard = (props: IPortfolioProps) => {
  const intl = useIntl();

  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const [openAnalytics, setOpenAnalytics] = useState<boolean>(false);
  const handleOpenAnalytics = () => setOpenAnalytics(true);
  const handleCloseAnalytics = () => setOpenAnalytics(false);

  const [openGraph, setOpenGraph] = useState<boolean>(false);
  const handleClickGraphBtn = () => setOpenGraph(!openGraph);

  const { symbol } = CryptoState();

  const [stat, setState] = useState({
    totalSum: 0,
    prevDayTotalSumChange: 0,
    prevDateChangePercentages: 0,
    totalProfitLoss: 0,
    totalProfitLossPercentages: 0,
  });

  useEffect(() => {
    CalculateStatData();
    console.log(stat);
  }, [props.portfolio]);

  const CalculateStatData = () => {
    let totalSum = props.portfolio.portfolioCoins.reduce(
      (partialSum: number, portfolioCoin: any) =>
        partialSum +
        portfolioCoin.coin.coinMarket[0].currentPrice * portfolioCoin.quantity,
      0
    );

    let cost = props.portfolio.portfolioCoins.reduce(
      (partialSum: number, portfolioCoin: any) =>
        partialSum + portfolioCoin.buyPrice * portfolioCoin.quantity,
      0
    );

    let totalProfitLoss = totalSum - cost;
    let totalProfitLossPercentages = cost / totalSum;

    let prevDayTotalSum = props.portfolio.portfolioCoins.reduce(
      (partialSum: number, portfolioCoin: any) =>
        partialSum +
        (1 - portfolioCoin.coin.coinMarket[0].priceChangePercentage24h) *
          portfolioCoin.coin.coinMarket[0].currentPrice *
          portfolioCoin.quantity,
      0
    );

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
    <>
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={6}>
          <Typography variant="h5">
            <Box sx={{ fontWeight: "bold" }}>{props.portfolio.name}</Box>
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", justifyContent: "end" }}>
          <Button onClick={handleClickGraphBtn}>
            <DonutSmallIcon />
          </Button>
          <Button variant="contained" onClick={handleOpenAdd}>
            {intl.formatMessage({ id: "add_coin" })}
          </Button>
          <AddCoinPortfolioModal
            handleCloseAdd={handleCloseAdd}
            openAdd={openAdd}
            portfolioName={props.portfolio.name}
            fetchPortfolio={props.fetchPortfolio}
          />

          {props.portfolio.portfolioCoins.length > 1 ? (
            <>
              <Button
                variant="contained"
                onClick={handleOpenAnalytics}
                sx={{ marginLeft: 2 }}
              >
                {intl.formatMessage({ id: "analytics" })}
              </Button>
              {openAnalytics ? (
                <AnalyticsModal
                  handleCloseAnalytics={handleCloseAnalytics}
                  openAnalytics={openAnalytics}
                  portfolioCoinArray={props.portfolio.portfolioCoins}
                  key={props.portfolio.id}
                />
              ) : null}
            </>
          ) : null}
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        sx={{ marginTop: 2, width: "40%", marginBottom: 3 }}
      >
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
              {symbol + numberWithCommas(Math.round(stat.totalSum * 100) / 100)}
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
              {symbol +
                numberWithCommas(
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
                  sx={{
                    color: stat.prevDateChangePercentages < 0 ? "red" : "green",
                  }}
                >
                  {stat.totalProfitLossPercentages < 0 ? null : "+"}
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
      {openGraph ? (
        <PieChart portfolioCoinArray={props.portfolio.portfolioCoins} />
      ) : (
        <PortfolioCoinTable
          portfolioCoinArray={props.portfolio.portfolioCoins}
          portfolio={props.portfolio}
          fetchPortfolio={props.fetchPortfolio}
        />
      )}
    </>
  );
};

export default PortfolioCard;
