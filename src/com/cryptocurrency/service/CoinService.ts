import axios from "axios";
import {API_BASE_URL} from "./CommonService";

class CoinService {

  async fetchTrendingCoins(currency: string) {
    axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token")
    return await axios.get(API_BASE_URL + `/public/coin/getTrendingCoins/${currency.toLowerCase()}`)
  }

  async fetchCoinList(currency: string, search: string) {
    axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token")
    return await axios.get(API_BASE_URL + `/public/coin/getCoinsList/${currency.toLowerCase()}?search=${search}`)
  }

  async fetchSingleCoin(id: string | undefined, currency: string) {
    axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token")
    return await axios.get(API_BASE_URL + `/public/coin/${id}/${currency.toLowerCase()}`)
  }

  async fetchHistoricalChart(id: string, days = 365, currency: string) {
    axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token")
    return await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`)
  }

  async fetchSingleCoinFromGesko(id: string) {
    axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token")
    return await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
  }

  async addFavoriteCoin(coin_id: string | undefined, username: string | null) {
    axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token")
    return await axios.post(`http://localhost:8080/coin/favorite/add?coin_id=` + coin_id + `&username=` + username)
  }

  async addPriceAlert(coin_id: string | undefined, price: string,  username: string | null, currency:string) {
    axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token")
    return await axios.post(`http://localhost:8080/coin/price_alerts/add?coin_id=${coin_id}&price=${price}&username=${username}` + 
      `&currency=${currency.toLowerCase()}`)
  }
  
  async fetchUserCoinInfo(coin_id: string | undefined, username: string | null) {
    axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token")
    return await axios.get(`http://localhost:8080/coin/user_coin_info?coin_id=${coin_id}&username=${username}`)
  }

  async fetchFavoriteCoins(username: string | null, currency: string) {
    axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token")
    return await axios.get(`http://localhost:8080/coin/favorite/all?username=${username}&currency=${currency.toLowerCase()}`)
  }
  
  async fetchPriceAlerts(username: string | null) {
    axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token")
    return await axios.get(`http://localhost:8080/coin/price_alerts/all?username=${username}`)
  }

  async removeFavoriteCoin(coin_id: string, username: string | null) {
    axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token")
    return await axios.delete(`http://localhost:8080/coin/favorite/remove?username=${username}&coin_id=${coin_id}`)
  }

  async removePriceAlert(coin_id: string, username: string | null) {
    axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token")
    return await axios.delete(`http://localhost:8080/coin/price_alerts/remove?username=${username}&coin_id=${coin_id}`)
  }

}

export default new CoinService();