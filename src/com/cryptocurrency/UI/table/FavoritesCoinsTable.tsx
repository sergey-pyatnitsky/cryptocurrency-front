import DeleteIcon from "@mui/icons-material/Delete";
import { Container, LinearProgress, TextField } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRowId,
  GridRowsProp,
  ruRU,
} from "@mui/x-data-grid";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../../context/CryptoContext";
import CoinProps from "../../model/coin";
import ErrorProps from "../../model/error";
import ResponseProps from "../../model/response";
import CoinService from "../../service/CoinService";
import { numberWithCommas } from "./CoinsTable";

export default function FavoritesCoinsTable() {
  const navigate = useNavigate();
  const intl = useIntl();

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState<number>(5);

  const { currency, symbol } = CryptoState();

  const handleSearch = () => {
    return coins.filter(
      (coin: CoinProps) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  const rows: GridRowsProp = handleSearch().map((coin: CoinProps) => {
    return {
      id: coin.id,
      col1: coin.name,
      col2: coin.coinMarket[0].currentPrice,
      col3: coin.coinMarket[0].priceChangePercentage24h,
      col4: coin.coinMarket[0].marketCap,
      col5: coin,
    };
  });

  let locale;
  localStorage.getItem("locale") == null ||
  localStorage.getItem("locale") === "ru-RU"
    ? (locale = ruRU.components.MuiDataGrid.defaultProps.localeText)
    : (locale = undefined);

  useEffect(() => {
    setLoading(true);
    fetchFavoriteCoins();
  }, [currency]);

  const fetchFavoriteCoins = () => {
    CoinService.fetchFavoriteCoins(sessionStorage.getItem("username"), currency)
      .then((resp: ResponseProps) => {
        setCoins(resp.data);
        setLoading(false);
      })
      .catch((err: ErrorProps) => {
        console.log(err);
        setLoading(false);
      });
  };

  const deleteFavoriteCoin = useCallback(
    (coin_id: GridRowId) => () => {
      CoinService.removeFavoriteCoin(
        coin_id.toString(),
        sessionStorage.getItem("username")
      )
        .then((resp: ResponseProps) => {
          if (resp.status === 200) {
            fetchFavoriteCoins();
          }
        })
        .catch((err: ErrorProps) => console.log(err));
    },
    []
  );

  const columns = useMemo<GridColumns>(
    () => [
      {
        field: "col1",
        flex: 1,
        minWidth: 100,
        maxWidth: 500,
        headerName: intl.formatMessage({ id: "coins_table_column_1" }),
        renderCell: (params: any) => {
          return (
            <>
              <img
                src={params.row.col5.image}
                alt={params.row.col5.name}
                height="50"
                style={{ marginBottom: 10 }}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ textTransform: "uppercase", fontSize: 22 }}>
                  {params.row.col5.symbol}
                </span>
                <span style={{ color: "darkgrey" }}>
                  {params.row.col5.name}
                </span>
              </div>
            </>
          );
        },
      },
      {
        field: "col2",
        flex: 1,
        minWidth: 50,
        maxWidth: 150,
        headerName: intl.formatMessage({ id: "coins_table_column_2" }),
        renderCell: (params: any) => {
          return (
            <>
              {symbol}{" "}
              {numberWithCommas(
                Number(params.row.col5.coinMarket[0].currentPrice.toFixed(2))
              )}
            </>
          );
        },
      },
      {
        field: "col3",
        flex: 1,
        minWidth: 50,
        maxWidth: 150,
        headerName: intl.formatMessage({ id: "coins_table_column_3" }),
        renderCell: (params: any) => {
          const profit: any =
            params.row.col5.coinMarket[0].priceChangePercentage24h > 0;
          return (
            <div
              style={{
                color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                fontWeight: 500,
              }}
            >
              {profit && "+"}
              {params.row.col5.coinMarket[0].priceChangePercentage24h.toFixed(
                2
              )}
              %
            </div>
          );
        },
      },
      {
        field: "col4",
        flex: 1,
        minWidth: 100,
        maxWidth: 200,
        headerName: intl.formatMessage({ id: "coins_table_column_4" }),
        renderCell: (params: any) => {
          return (
            <>
              {symbol}{" "}
              {numberWithCommas(
                Number(
                  params.row.col5.coinMarket[0].marketCap
                    .toString()
                    .slice(0, -6)
                )
              )}
              M
            </>
          );
        },
      },
      {
        field: "col5",
        type: "actions",
        width: 80,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={deleteFavoriteCoin(params.id)}
          />,
        ],
      },
    ],
    []
  );

  return (
    <Container style={{ textAlign: "center", marginBottom: 40 }}>
      <TextField
        label={intl.formatMessage({ id: "coins_table_search_text" })}
        variant="outlined"
        style={{ marginBottom: 20, width: "100%" }}
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />

      {loading ? (
        <LinearProgress style={{ backgroundColor: "gold" }} />
      ) : (
        <div>
          <DataGrid
            autoHeight
            rows={rows}
            columns={columns}
            localeText={locale}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            rowHeight={100}
            onSelectionModelChange={(row) => navigate(`/coins/${row}`)}
            sx={{
              boxShadow: 2,
              border: 0,
              backgroundColor: "background.paper",
              "& .MuiDataGrid-columnHeaders": {
                fontWeight: "bold",
                fontSize: 16,
                fontFamily: "Montserrat",
                color: "text.primary",
              },
              "& .MuiDataGrid-cell": {
                height: "100",
              },
              "& .MuiDataGrid-row": {
                height: "200",
              },
            }}
          />
        </div>
      )}
    </Container>
  );
}
