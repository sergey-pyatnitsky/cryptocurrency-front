import {useEffect, useState} from "react";
import {Line} from "react-chartjs-2";
import {CircularProgress, Grid} from "@mui/material";
import {CryptoState} from "../../../context/CryptoContext";
import CoinChartHeader from "./CoinChartHeader";
import CoinService from "../../../service/CoinService";
import ResponseProps from "../../../model/response";
import ErrorProps from "../../../model/error";
import CoinProps from "../../../model/coin";
import CoinPriceStatistics from "./CoinPriceStatistics";
import {useIntl} from "react-intl";

interface ICoinChartProps {
  coin: CoinProps
}

const CoinChart = ({coin}: ICoinChartProps) => {
  const intl = useIntl()

  const [historicData, setHistoricData] = useState<number[]>();
  const [days, setDays] = useState<number>(1);
  const {currency} = CryptoState();
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    CoinService.fetchHistoricalChart(coin.id, days, currency)
      .then((resp: ResponseProps) => {
        setFlag(true)
        setHistoricData(resp.data.prices)
      })
      .catch((err: ErrorProps) => {
        console.log(err)
        setFlag(false);
      });
  }, [coin.id, days, currency]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={8}>
        <CoinChartHeader coinName={coin.name} days={days} setDays={setDays} setFlag={setFlag}/>
        <div style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 40
        }}>
          {!historicData || !flag ? (
            <CircularProgress
              style={{color: "gold"}}
              size={250}
              thickness={1}
            />
          ) : (
            <>
              <Line
                data={{
                  labels: historicData.map((coin: any) => {
                    let date = new Date(coin[0]);
                    let time =
                      date.getHours() > 12
                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                        : `${date.getHours()}:${date.getMinutes()} AM`;
                    return days === 1 ? time : date.toLocaleDateString();
                  }),

                  datasets: [
                    {
                      label: intl.formatMessage({id: 'price_past'}) + " " + days
                        + intl.formatMessage({id: 'price_in'}) + " " + currency,
                      data: historicData.map((coin: any) => coin),
                      borderColor: "#EEBC1D",
                    },
                  ],
                }}
                options={{
                  elements: {
                    point: {
                      radius: 1,
                    },
                  },
                }}
              />
            </>
          )}
        </div>
      </Grid>
      <Grid item xs={4}>
        <CoinPriceStatistics coin={coin}/>
      </Grid>
    </Grid>
  );
};

export default CoinChart;