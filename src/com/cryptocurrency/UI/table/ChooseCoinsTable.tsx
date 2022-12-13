import { useEffect, useState } from "react";
import {
  Container,
  TableCell,
  LinearProgress,
  Typography,
  TextField,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
  Button
} from "@mui/material";
import Pagination from '@mui/material/Pagination';
import axios from "axios";
import { CryptoState } from "../../context/CryptoContext";
import { CoinList } from "../../config/api";
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { Toolbar } from '@mui/material';

interface ICoinProps {
  "id": string,
  "name": string,
  "symbol": string,
  "image": string,
  "ruDescription": string,
  "enDescription": string,
  "coinMarket": {
    "id": number,
    "designation": {
      "name": string,
      "symbol": string
    },
    "currentPrice": number,
    "marketCap": number,
    "fullyDilutedValuation": number,
    "high24h": number,
    "low24h": number,
    "priceChangePercentage24h": number,
    "marketCapChangePercentage24h": number,
    "circulatingSupply": number,
    "totalSupply": number,
    "lastUpdated": string
  }[]
}

export function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const ChooseCoinsTable = (props: any) => {
  const navigate = useNavigate();
  const intl = useIntl()

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [isInput, setIsInput] = useState<boolean>(false);
  const [key, setKey] = useState<string>("");
  const [page, setPage] = useState(1);

  const { currency, symbol } = CryptoState();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency, search));

    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin: ICoinProps) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  const handleSelectCount = (key: string) => {
    setIsInput(true)
    setKey(key)

  }

  const handleAddCoinPortfolio = () => {
    setIsInput(false)
    props.addPortfolioCoin()
  }

  return (
    <Container style={{ textAlign: "center" }}>
      <TextField
        label={intl.formatMessage({ id: 'coins_table_search_text' })}
        variant="outlined"
        style={{ marginBottom: 20, width: "100%" }}
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />
      <TableContainer component={Paper}>
        {loading ? (
          <LinearProgress style={{ backgroundColor: "gold" }} />
        ) : (
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {[
                  intl.formatMessage({ id: 'coins_table_column_1' }),
                  intl.formatMessage({ id: 'coins_table_column_2' }),
                  intl.formatMessage({ id: 'coins_table_column_3' }),
                  intl.formatMessage({ id: 'coins_table_column_4' }), 'Действие'].map((head) => (
                    <TableCell
                      style={{
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === intl.formatMessage({ id: 'coins_table_column_1' }) ? "left" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {handleSearch()
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((row: ICoinProps) => {
                  const profit: any = row.coinMarket[0].priceChangePercentage24h > 0;
                  return (
                    <TableRow
                      // onClick={() => navigate(`/coins/${row.coin.id}`)}
                      sx={{
                        cursor: "pointer",
                        fontFamily: "Montserrat",
                      }}
                      key={row.name}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          display: "flex",
                          gap: 15,
                        }}
                      >
                        <img
                          src={row.image}
                          alt={row.name}
                          height="50"
                          style={{ marginBottom: 10 }}
                        />
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <span
                            style={{
                              textTransform: "uppercase",
                              fontSize: 22,
                            }}
                          >
                            {row.symbol}
                          </span>
                          <span style={{ color: "darkgrey" }}>
                            {row.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        {symbol}{" "}
                        {numberWithCommas(Number(row.coinMarket[0].currentPrice.toFixed(2)))}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                          fontWeight: 500,
                        }}
                      >
                        {profit && "+"}
                        {row.coinMarket[0].priceChangePercentage24h.toFixed(2)}%
                      </TableCell>
                      <TableCell align="right">
                        {symbol}{" "}
                        {numberWithCommas(
                          Number(row.coinMarket[0].marketCap.toString().slice(0, -6))
                        )}
                        M
                      </TableCell>
                      {/* <TableCell align="right">
                        <TextField
                          id="outlined-error-helper-text"
                          label="Количество"
                          sx={{ width: "70%", height: "70%" }}
                        // onChange={(e) => setPortfolio({ ...portfolio, name: e.target.value })}
                        />
                      </TableCell> */}
                      <TableCell align="right">
                        {
                          isInput && key == row.name
                            ? (
                              <>
                                <Button variant="contained" onClick={handleAddCoinPortfolio}>Добавить</Button>
                                <TextField
                                  id="outlined-error-helper-text"
                                  size="small"
                                  label="Количество"
                                  sx={{ width: "50%", height: "70%", marginLeft: 1 }}
                                  onChange={(e) =>
                                    props.setPortfolioCoinDto({
                                      ...props.portfolioCoinDto,
                                      quantity: e.target.value,
                                      coinId: row.id,
                                      buyPrice: row.coinMarket[0].currentPrice,
                                      username: sessionStorage.getItem("username"),
                                    })}
                                />
                              </>
                            )
                            : <Button variant="contained" onClick={(e) => handleSelectCount(row.name)}>Выбрать</Button>
                        }
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      {/* 
      <Pagination
        count={Number((handleSearch()?.length / 10).toFixed(0))}
        style={{
          padding: 20,
          width: "100%",
                        display: "flex",
                        justifyContent: "center",
        }}
                        onChange={(_, value) => {
                          setPage(value);
                          window.scroll(0, 450);
                        }}
      /> */}
    </Container>
  );
}

export default ChooseCoinsTable;