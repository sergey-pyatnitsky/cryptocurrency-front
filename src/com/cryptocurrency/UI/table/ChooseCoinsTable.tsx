import { Button, Container, LinearProgress, TextField } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowsProp,
  ruRU,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { CryptoState } from "../../context/CryptoContext";
import CoinProps from "../../model/coin";
import ErrorProps from "../../model/error";
import ResponseProps from "../../model/response";
import CoinService from "../../service/CoinService";

export function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const ChooseCoinsTable = (props: any) => {
  const intl = useIntl();

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState<number>(5);
  const [isInput, setIsInput] = useState<boolean>(false);
  const [key, setKey] = useState<string>("");

  const { currency, symbol } = CryptoState();

  const handleSearch = () => {
    return coins.filter(
      (coin: CoinProps) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  const handleSelectCount = (key: string) => {
    setIsInput(true);
    setKey(key);
  };

  const handleAddCoinPortfolio = () => {
    setIsInput(false);
    props.addPortfolioCoin();
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

  const columns: GridColDef[] = [
    {
      field: "col1",
      flex: 1,
      minWidth: 100,
      maxWidth: 150,
      headerName: intl.formatMessage({ id: "coins_table_column_1" }),
      renderCell: (params: GridRenderCellParams) => {
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
              <span style={{ color: "darkgrey" }}>{params.row.col5.name}</span>
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
      renderCell: (params: GridRenderCellParams) => {
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
      headerName: intl.formatMessage({ id: "coins_table_column_3" }),
      renderCell: (params: GridRenderCellParams) => {
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
            {params.row.col5.coinMarket[0].priceChangePercentage24h.toFixed(2)}%
          </div>
        );
      },
    },
    {
      field: "col4",
      flex: 1,
      minWidth: 100,
      maxWidth: 150,
      headerName: intl.formatMessage({ id: "coins_table_column_4" }),
      renderCell: (params: GridRenderCellParams) => {
        return (
          <>
            {symbol}{" "}
            {numberWithCommas(
              Number(
                params.row.col5.coinMarket[0].marketCap.toString().slice(0, -6)
              )
            )}
            M
          </>
        );
      },
    },
    {
      field: "col5",
      flex: 1,
      headerName: "",
      renderCell: (params: GridRenderCellParams) => {
        return (
          <>
            {isInput && key === params.row.col5.name ? (
              <>
                <Button variant="contained" onClick={handleAddCoinPortfolio}>
                  {intl.formatMessage({ id: "add" })}
                </Button>
                <TextField
                  id="outlined-error-helper-text"
                  size="small"
                  label={intl.formatMessage({ id: "quantity" })}
                  sx={{ marginLeft: 1 }}
                  onChange={(e) =>
                    props.setPortfolioCoinDto({
                      ...props.portfolioCoinDto,
                      quantity: e.target.value,
                      coinId: params.row.col5.id,
                      buyPrice: params.row.col5.coinMarket[0].currentPrice,
                      username: sessionStorage.getItem("username"),
                    })
                  }
                />
              </>
            ) : (
              <Button
                variant="contained"
                onClick={(e) => handleSelectCount(params.row.col5.name)}
              >
                {intl.formatMessage({ id: "choose" })}
              </Button>
            )}
          </>
        );
      },
    },
  ];

  let locale;
  localStorage.getItem("locale") == null ||
  localStorage.getItem("locale") === "ru-RU"
    ? (locale = ruRU.components.MuiDataGrid.defaultProps.localeText)
    : (locale = undefined);

  useEffect(() => {
    setLoading(true);
    CoinService.fetchCoinList(currency, search)
      .then((resp: ResponseProps) => {
        setCoins(resp.data);
        setLoading(false);
      })
      .catch((err: ErrorProps) => {
        console.log(err);
        setLoading(false);
      });
  }, [currency]);

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
};

export default ChooseCoinsTable;