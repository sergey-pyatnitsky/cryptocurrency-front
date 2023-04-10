import axios from "axios";
import { API_BASE_URL } from "./CommonService";
import PortfolioCoinDTOProps from "../model/portfolioCoinDTO";
import PortfolioAnalyticsDTOProps from "../model/portfolioAnalyticsDTO";

export default class PortfolioService {

  static async fetchAllPortfolio(username: string | null, currency: string) {
      axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token")
      return await axios.get(API_BASE_URL + `/portfolio/all?username=${username}&currency=${currency.toLowerCase()}`)
  }

  static async removePortfolioCoin(portfolioId: number, coinId: string) {
      axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token")
      return await axios.delete(API_BASE_URL + `/portfolio/coin/remove?portfolio_id=${portfolioId}&coin_id=${coinId}`)
  }

  static async addPortfolio(username: string | null, portfolio_name: string) {
      axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token")
      return await axios.post(API_BASE_URL + `/portfolio/add?username=${username}`, {
        name: portfolio_name
      })
  }

  static async addPortfolioCoin(portfolioCoinDto: PortfolioCoinDTOProps) {
    axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token")
    return await axios.post(API_BASE_URL + `/portfolio/coin/add`, portfolioCoinDto)
  }

  static async fetchPortfolioAnalytics(portfolioCoinDto: PortfolioAnalyticsDTOProps[], coins: string, currency: string) {
    axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token")
    return await axios.post(API_BASE_URL + `/coin/markovits/analysis/${currency.toLowerCase()}?coins=${coins}`, portfolioCoinDto)
  }
  
}