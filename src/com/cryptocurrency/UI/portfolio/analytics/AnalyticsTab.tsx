import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { useIntl } from "react-intl";
import PortfolioAnalyticsDTOProps from "../../../model/portfolioAnalyticsDTO";
import PortfolioCoinProps from "../../../model/portfolioCoin";
import CurrentPortfolioAnalytics from "./CurrentPortfolioAnalytics";
import PortfolioAnalyticsProps from "../../../model/portfolioAnalytics";
import PortfolioOptimization from "./PortfolioOptimization";

interface IAnalyticsTabProps {
  portfolioCoinArray: PortfolioCoinProps[];
  openAnalytics: boolean;
  analytics: PortfolioAnalyticsProps;
  loading: boolean;
  portfolioCoinDto: PortfolioAnalyticsDTOProps[];
}

const AnalyticsTab = (props: IAnalyticsTabProps) => {
  const intl = useIntl();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab
            label={intl.formatMessage({ id: "сurrent_portfolio_analytics" })}
          />
          <Tab label={intl.formatMessage({ id: "portfolio_optimization" })} />
        </Tabs>
      </Box>
      <Box sx={{ padding: 2 }}>
        {value === 0 && (
          <CurrentPortfolioAnalytics
            openAnalytics={props.openAnalytics}
            portfolioCoinArray={props.portfolioCoinArray}
            loading={props.loading}
            analytics={props.analytics}
            portfolioCoinDto={props.portfolioCoinDto}
          />
        )}
        {value === 1 && (
          <PortfolioOptimization
            openAnalytics={props.openAnalytics}
            portfolioCoinArray={props.portfolioCoinArray}
            loading={props.loading}
            analytics={props.analytics}
            portfolioCoinDto={props.portfolioCoinDto}
          />
        )}
      </Box>
    </Box>
  );
};

export default AnalyticsTab;
