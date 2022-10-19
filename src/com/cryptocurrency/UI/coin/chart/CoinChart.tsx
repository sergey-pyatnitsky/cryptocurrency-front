import axios from "axios";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { CircularProgress, Grid } from "@mui/material";
import { HistoricalChart } from "../../../config/api";
import { CryptoState } from "../../../context/CryptoContext";
import "chart.js/auto";
import CoinChartHeader from "./CoinChartHeader";
import CoinPriceStatistics from "./CoinPriceStatistics";

type mapWithStringKeyAndNumberValue = {
  [key: string]: number
};

// interface ICoinProps {
//   coin: {
//     id: string
//     name: string
//     description: {
//       en: string
//       ru: string
//     }
//     image: {
//       small: string
//     };
//     market_data: {
//       current_price: mapWithStringKeyAndNumberValue
//       market_cap: mapWithStringKeyAndNumberValue
//     }
//     market_cap_rank: number
//   }
// }

// const CoinInfo = ({ coin }: ICoinProps) => {
const CoinChart = ({ coin }: any) => {
  // const [historicData, setHistoricData] = useState<ICoinProps[]>();
  const [historicData, setHistoricData] = useState<any[]>();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const [flag, setflag] = useState(false);

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setflag(true);
    setHistoricData(data.prices);
  };

  useEffect(() => {
    fetchHistoricData();
  }, [days]);

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <CoinChartHeader days={days} setDays={setDays} setFlag={setflag} />
          <div style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 40
          }}>
            {!historicData || flag === false ? (
              <CircularProgress
                style={{ color: "gold" }}
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
                        label: `Price ( Past ${days} Days ) in ${currency}`,
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
          <CoinPriceStatistics coin={coin} />
        </Grid>
      </Grid>
    </>
  );
};

export default CoinChart;