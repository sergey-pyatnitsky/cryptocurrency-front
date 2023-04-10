interface CoinProps {
  id: string
  name: string
  symbol: string
  ruDescription: string
  enDescription: string
  image: string
  coinMarket: [{
    circulatingSupply: number
    currentPrice: number
    designation: [{
      name: string
      symbol: string
    }]
    fullyDilutedValuation: number
    high24h: number
    low24h: number
    lastUpdated: string
    marketCap: number
    marketCapChangePercentage24h: number
    priceChangePercentage24h: number
    totalSupply: number
    maxSupply: number
  }]
}

export default CoinProps;