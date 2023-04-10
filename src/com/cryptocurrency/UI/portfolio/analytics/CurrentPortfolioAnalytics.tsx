import { Box, Grid, LinearProgress } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useIntl } from "react-intl";
import PortfolioAnalyticsDTOProps from "../../../model/portfolioAnalyticsDTO";
import PortfolioCoinProps from "../../../model/portfolioCoin";
import PortfolioAnalyticsProps from "../../../model/portfolioAnalytics";

interface IPortfolioProps {
  portfolioCoinArray: PortfolioCoinProps[];
  openAnalytics: boolean;
  loading: boolean;
  analytics: PortfolioAnalyticsProps;
  portfolioCoinDto: PortfolioAnalyticsDTOProps[];
}

const CurrentPortfolioAnalytics = (props: IPortfolioProps) => {
  const intl = useIntl();

  return (
    <>
      {props.loading ? (
        <LinearProgress style={{ backgroundColor: "gold" }} />
      ) : (
        <>
          <Box>
            <Typography variant="h6">
              <Box sx={{ fontWeight: "bold", marginBottom: 2 }}>
                {intl.formatMessage({ id: "covariance_matrix" }) + ":"}
              </Box>
            </Typography>
            <table
              style={{
                border: "2px solid black",
                borderCollapse: "collapse",
                fontSize: 25,
                marginLeft: "20%",
              }}
            >
              <tr>
                <th style={{ border: "2px solid black" }}></th>
                <>
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
                </>
              </tr>
              {props.portfolioCoinDto.map(
                (item: { keyNumber: number; coinId: string }) => {
                  return (
                    <tr key={item.coinId}>
                      <>
                        {
                          <>
                            <td
                              style={{
                                border: "2px solid black",
                                fontWeight: "bold",
                              }}
                            >
                              {item.coinId}
                            </td>
                            {(
                              props.analytics.covarianceMatrix[
                                item.keyNumber
                              ] as any[]
                            )?.map((item: number) => {
                              return (
                                <td
                                  key={item}
                                  style={{ border: "2px solid black" }}
                                >
                                  {Math.round(item * 100) / 100}
                                </td>
                              );
                            })}
                          </>
                        }
                      </>
                    </tr>
                  );
                }
              )}
            </table>
          </Box>
          <Box>
            <Typography variant="h6">
              <Box sx={{ fontWeight: "bold", marginBottom: 2 }}>
                {intl.formatMessage({ id: "currency_risks" }) + ":"}
                <table
                  style={{
                    border: "2px solid black",
                    borderCollapse: "collapse",
                    fontSize: 25,
                    marginLeft: "20%",
                  }}
                >
                  <tr>
                    <>
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
                    </>
                  </tr>
                  {props.analytics.deviation.map((item: number) => {
                    return (
                      <th style={{ border: "2px solid black" }}>
                        {Math.round(item * 100) / 100 + "%"}
                      </th>
                    );
                  })}
                </table>
              </Box>
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">
              <Box sx={{ fontWeight: "bold", marginBottom: 2 }}>
                {intl.formatMessage({ id: "expected_profitability" }) + ":"}
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
                  {props.analytics.profitability.map((item: number) => {
                    return (
                      <th style={{ border: "2px solid black" }}>
                        {Math.round(item * 100) / 100 + "%"}
                      </th>
                    );
                  })}
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
                  {Math.round(props.analytics.totalRiskOfPortfolio * 100) /
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
                      props.analytics.totalProfitabilityOfPortfolio > 0
                        ? "green"
                        : "red",
                  }}
                >
                  {Math.round(
                    props.analytics.totalProfitabilityOfPortfolio * 100
                  ) /
                    100 +
                    "%"}
                </Grid>
              </Grid>
            </Typography>
          </Box>
        </>
      )}
    </>
  );
};

export default CurrentPortfolioAnalytics;
