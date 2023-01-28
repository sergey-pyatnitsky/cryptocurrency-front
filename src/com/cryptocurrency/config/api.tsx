export const CoinList = (currency: string, search: string) =>
  `http://localhost:8080/public/coin/getCoinsList/` + currency.toLowerCase() + `?search=` + search;

export const UsersList = () =>
  `http://localhost:8080/user/get_all`;

export const EditUserRole = (username: string, role: string) =>
  `http://localhost:8080/user/change_role/` + username + `/` + role;

export const ActivateUser = (username: string, active: boolean) =>
  `http://localhost:8080/user/activate/` + username + `/` + active;

export const RemoveUser = (username: string) =>
  `http://localhost:8080/user/remove/` + username;

export const AddFavoriteCoin = (coin_id: string | undefined, username: string | null) =>
  `http://localhost:8080/coin/favorite/add?coin_id=` + coin_id + `&username=` + username;

export const GetFavoriteCoins = (username: string | null, currency: string) =>
  `http://localhost:8080/coin/favorite/all?username=` + username + `&currency=` + currency.toLowerCase();

export const AddPortfolio = (username: string | null) =>
  `http://localhost:8080/portfolio/add?username=` + username;

export const RemovePortfolioCoin = (portfolioId: number, coinId: string) =>
  `http://localhost:8080/portfolio/coin/remove?portfolio_id=` + portfolioId + `&coin_id=` + coinId;

export const GetAllPortfolio = (username: string | null, currency: string) =>
  `http://localhost:8080/portfolio/all?username=` + username + `&currency=` + currency.toLowerCase();

export const FavoritesCoinList = (currency: any) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=3&page=1&sparkline=false`;

export const SingleCoin = (id: any) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

export const HistoricalChart = (id: any, days = 365, currency: any) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;