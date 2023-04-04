import DeleteIcon from "@mui/icons-material/Delete";
import { Container } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
  GridRowsProp,
  ruRU,
} from "@mui/x-data-grid";
import { useCallback, useMemo, useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../../context/CryptoContext";
import ErrorProps from "../../model/error";
import PortfolioCoinProps from "../../model/portfolioCoin";
import ResponseProps from "../../model/response";
import PortfolioService from "../../service/PortfolioService";

interface IPortfolioCoinTableProps {
  portfolioCoinArray: [PortfolioCoinProps];
  portfolio: any;
  fetchPortfolio: () => void;
}

export function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function PortfolioCoinTable(props: IPortfolioCoinTableProps) {
  const navigate = useNavigate();
  const intl = useIntl();

  const [pageSize, setPageSize] = useState<number>(5);
  const { symbol } = CryptoState();

  const deleteCoinFromPortfolio = useCallback(
    (portfolioId: number, coinId: string) => () => {
      PortfolioService.removePortfolioCoin(portfolioId, coinId)
        .then((resp: ResponseProps) => props.fetchPortfolio())
        .catch((err: ErrorProps) => console.log(err));
    },
    []
  );

  const rows: GridRowsProp = props.portfolioCoinArray.map(
    (portfolioCoin: PortfolioCoinProps) => {
      return {
        id: portfolioCoin.coin.id,
        current_price: portfolioCoin.coin.coinMarket[0].currentPrice.toFixed(2),
        price_change:
          portfolioCoin.coin.coinMarket[0].priceChangePercentage24h.toFixed(2),
        market_cap: portfolioCoin.coin.coinMarket[0].marketCap,
        quantity: portfolioCoin.quantity,
        buy_price: portfolioCoin.buyPrice,
        actions: portfolioCoin,
      };
    }
  );

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        flex: 1,
        minWidth: 100,
        maxWidth: 500,
        headerName: intl.formatMessage({ id: "coins_table_column_1" }),
        renderCell: (params: GridRenderCellParams) => {
          return (
            <>
              <img
                src={params.row.actions.coin.image}
                alt={params.row.actions.coin.name}
                height="50"
                style={{ marginBottom: 10 }}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ textTransform: "uppercase", fontSize: 22 }}>
                  {params.row.actions.coin.symbol}
                </span>
                <span style={{ color: "darkgrey" }}>
                  {params.row.actions.coin.name}
                </span>
              </div>
            </>
          );
        },
      },
      {
        field: "current_price",
        flex: 1,
        minWidth: 50,
        maxWidth: 150,
        headerName: intl.formatMessage({ id: "coins_table_column_2" }),
        renderCell: (params: GridRenderCellParams) => {
          return (
            <>
              {symbol}{" "}
              {numberWithCommas(
                Number(
                  params.row.actions.coin.coinMarket[0].currentPrice.toFixed(2)
                )
              )}
            </>
          );
        },
      },
      {
        field: "price_change",
        flex: 1,
        minWidth: 50,
        maxWidth: 150,
        headerName: intl.formatMessage({ id: "coins_table_column_3" }),
        renderCell: (params: GridRenderCellParams) => {
          const profit: any =
            params.row.actions.coin.coinMarket[0].priceChangePercentage24h > 0;
          return (
            <div
              style={{
                color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                fontWeight: 500,
              }}
            >
              {profit && "+"}
              {params.row.actions.coin.coinMarket[0].priceChangePercentage24h.toFixed(
                2
              )}
              %
            </div>
          );
        },
      },
      {
        field: "market_cap",
        flex: 1,
        minWidth: 100,
        maxWidth: 200,
        headerName: intl.formatMessage({ id: "coins_table_column_4" }),
        renderCell: (params: GridRenderCellParams) =>
          symbol +
          " " +
          numberWithCommas(
            Number(
              params.row.actions.coin.coinMarket[0].marketCap
                .toString()
                .slice(0, -6)
            )
          ) +
          "M",
      },
      {
        field: "quantity",
        flex: 1,
        minWidth: 100,
        maxWidth: 200,
        headerName: intl.formatMessage({ id: "quantity" }),
        renderCell: (params: GridRenderCellParams) =>
          params.row.actions.quantity,
      },
      {
        field: "buy_price",
        flex: 1,
        minWidth: 100,
        maxWidth: 200,
        headerName: intl.formatMessage({ id: "buy_price" }),
        renderCell: (params: GridRenderCellParams) =>
          symbol + numberWithCommas(params.row.actions.buyPrice.toFixed(2)),
      },
      {
        field: "actions",
        type: "actions",
        getActions: (params: GridRowParams) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={deleteCoinFromPortfolio(
              props.portfolio.id,
              params.row.actions.coin.id
            )}
          />,
        ],
      },
    ],
    [deleteCoinFromPortfolio]
  );

  let locale;
  localStorage.getItem("locale") == null ||
  localStorage.getItem("locale") === "ru-RU"
    ? (locale = ruRU.components.MuiDataGrid.defaultProps.localeText)
    : (locale = undefined);

  return (
    <Container style={{ textAlign: "center", marginBottom: 40 }}>
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
    </Container>
  );
}
