interface PortfolioCoinProps {
  id: number;
  coin: {
    id: string;
    name: string;
    symbol: string;
    enDescription: string;
    ruDescription: string;
    image: string;
    coinMarket: {
      currentPrice: number;
      marketCap: number;
      fullyDilutedValuation: number;
      high24h: number;
      low24h: number;
      priceChangePercentage24h: number;
      marketCapChangePercentage24h: number;
      circulatingSupply: number;
      totalSupply: number;
      lastUpdated: string;
    }[];
  };
  designation: {
    name: string;
    symbol: string;
  };
  buyPrice: number;
  quantity: number;
}

export default PortfolioCoinProps;