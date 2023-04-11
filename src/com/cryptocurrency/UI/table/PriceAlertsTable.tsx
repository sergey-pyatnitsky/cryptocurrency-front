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
import ErrorProps from "../../model/error";
import PriceAlertProps from "../../model/priceAlert";
import ResponseProps from "../../model/response";
import CoinService from "../../service/CoinService";
import { numberWithCommas } from "./CoinsTable";

const PriceAlertsTable = () => {
  const navigate = useNavigate();
  const intl = useIntl();

  const [priceAlerts, setPriceAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState<number>(5);

  const { currency, symbol } = CryptoState();

  const handleSearch = () => {
    return priceAlerts.filter(
      (priceAlert: PriceAlertProps) =>
        priceAlert.coin.symbol.toLowerCase().includes(search) ||
        priceAlert.coin.name.toLowerCase().includes(search)
    );
  };

  const rows: GridRowsProp = handleSearch().map(
    (priceAlert: PriceAlertProps) => {
      return {
        id: priceAlert.coin.id,
        col1: priceAlert.coin.name,
        col2: priceAlert.coin.coinMarket[0].currentPrice,
        col3: priceAlert.coin.coinMarket[0].priceChangePercentage24h,
        col4: priceAlert.price,
        col5: priceAlert,
      };
    }
  );

  let locale;
  localStorage.getItem("locale") == null ||
  localStorage.getItem("locale") === "ru-RU"
    ? (locale = ruRU.components.MuiDataGrid.defaultProps.localeText)
    : (locale = undefined);

  useEffect(() => {
    fetchPriceAlerts();
  }, [currency]);

  const fetchPriceAlerts = () => {
    setLoading(true);
    CoinService.fetchPriceAlerts(sessionStorage.getItem("username"))
      .then((resp: ResponseProps) => {
        setPriceAlerts(resp.data.alerts);
      })
      .catch((err: ErrorProps) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deletePriceAlert = useCallback(
    (coin_id: GridRowId) => () => {
      CoinService.removePriceAlert(
        coin_id.toString(),
        sessionStorage.getItem("username")
      )
        .then((resp: ResponseProps) => {
          if (resp.status === 200) {
            fetchPriceAlerts();
          }
        })
        .catch((err: ErrorProps) =>
          console.log(err)
        );
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
                src={params.row.col5.coin.image}
                alt={params.row.col5.coin.name}
                height="50"
                style={{ marginBottom: 10 }}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ textTransform: "uppercase", fontSize: 22 }}>
                  {params.row.col5.coin.symbol}
                </span>
                <span style={{ color: "darkgrey" }}>
                  {params.row.col5.coin.name}
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
              {symbol.toString()}{" "}
              {numberWithCommas(
                Number(
                  params.row.col5.coin.coinMarket[0].currentPrice.toFixed(2)
                )
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
            params.row.col5.coin.coinMarket[0].priceChangePercentage24h > 0;
          return (
            <div
              style={{
                color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                fontWeight: 500,
              }}
            >
              {profit && "+"}
              {params.row.col5.coin.coinMarket[0].priceChangePercentage24h.toFixed(
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
        headerName: intl.formatMessage({ id: "coins_table_column_5" }),
        renderCell: (params: any) => {
          return (
            <>
              {params.row.col5.designation.symbol +
                " " +
                numberWithCommas(params.row.col5.price)}
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
            onClick={deletePriceAlert(params.id)}
          />,
        ],
      },
    ],
    [intl, symbol, deletePriceAlert]
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
};

export default PriceAlertsTable;
