import axios from "axios";
import {API_BASE_URL} from "./CommonService";

class CoinService {

  async fetchTrendingCoins(currency: string) {
    return await axios.get(API_BASE_URL + `/public/coin/getTrendingCoins/${currency}`)
  }

}

export default new CoinService();