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
} from "@mui/material";
import Pagination from '@mui/material/Pagination';
import axios from "axios";
import { CryptoState } from "../../context/CryptoContext";
import { CoinList } from "../../config/api";
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

export function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function CoinsTable() {
  const navigate = useNavigate();
  const intl = useIntl()

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { currency, symbol } = CryptoState();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));

    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin: any) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <Container style={{ textAlign: "center" }}>
      <Typography
        variant="h4"
        style={{ margin: 18, fontFamily: "Montserrat" }}
      >
        {intl.formatMessage({ id: 'coins_table_title' })}
      </Typography>
      <TextField
        label={intl.formatMessage({ id: 'coins_table_search_text' })}
        variant="outlined"
        style={{ marginBottom: 20, width: "100%" }}
        onChange={(e) => setSearch(e.target.value)}
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
                  intl.formatMessage({ id: 'coins_table_column_4' })].map((head) => (
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
                .map((row: any) => {
                  const profit: any = row.price_change_percentage_24h > 0;
                  return (
                    <TableRow
                      onClick={() => navigate(`/coins/${row.id}`)}
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
                          src={row?.image}
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
                        {numberWithCommas(row.current_price.toFixed(2))}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                          fontWeight: 500,
                        }}
                      >
                        {profit && "+"}
                        {row.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>
                      <TableCell align="right">
                        {symbol}{" "}
                        {numberWithCommas(
                          row.market_cap.toString().slice(0, -6)
                        )}
                        M
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        )}
      </TableContainer>

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
      />
    </Container>
  );
}
