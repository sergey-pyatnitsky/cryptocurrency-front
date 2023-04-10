interface PortfolioAnalyticsProps {
  covarianceMatrix: any;
  deviation: number[];
  profitability: number[];
  totalProfitabilityOfPortfolio: number;
  totalRiskOfPortfolio: number;
  optimizedPortfolio: {
    meanReturn: number;
    volatility: number;
    weights: number[];
  }
}

export default PortfolioAnalyticsProps;