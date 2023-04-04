import { useState } from "react";
import { Pie } from "react-chartjs-2";
import PortfolioCoinProps from "../../model/portfolioCoin";
import { useIntl } from "react-intl";

interface IPieChartProps {
  portfolioCoinArray: [PortfolioCoinProps];
}

const PieChart = (props: IPieChartProps) => {
  const intl = useIntl();

  const [chartCostData] = useState({
    labels: props.portfolioCoinArray.map((data) => data.coin.name),
    datasets: [
      {
        data: props.portfolioCoinArray.map(
          (data) => data.quantity * data.coin.coinMarket[0].currentPrice
        ),
        backgroundColor: [
          "#009999",
          "#1D7373",
          "#006363",
          "#33CCCC",
          "#5CCCCC",
        ],
        borderColor: "black",
        borderWidth: 0,
      },
    ],
  });

  const [chartQuantityData] = useState({
    labels: props.portfolioCoinArray.map((data) => data.coin.name),
    datasets: [
      {
        data: props.portfolioCoinArray.map((data) => data.quantity),
        backgroundColor: [
          "#009999",
          "#1D7373",
          "#006363",
          "#33CCCC",
          "#5CCCCC",
        ],
        borderColor: "black",
        borderWidth: 0,
      },
    ],
  });

  return (
    <div
      className="chart-container"
      style={{
        maxWidth: "20%",
        marginLeft: "40%",
        marginBottom: 40,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Pie
        data={chartCostData}
        options={{
          plugins: {
            title: {
              display: true,
              text: intl.formatMessage({ id: "distribution_of_funds" }),
            },
          },
        }}
      />
      <Pie
        data={chartQuantityData}
        options={{
          plugins: {
            title: {
              display: true,
              text: intl.formatMessage({
                id: "distribution_of_number_of_currencies",
              }),
            },
          },
        }}
      />
    </div>
  );
};

export default PieChart;
