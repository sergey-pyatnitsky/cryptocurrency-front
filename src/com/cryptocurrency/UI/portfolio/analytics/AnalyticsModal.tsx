import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { CryptoState } from "../../../context/CryptoContext";
import ErrorProps from "../../../model/error";
import PortfolioCoinProps from "../../../model/portfolioCoin";
import ResponseProps from "../../../model/response";
import PortfolioService from "../../../service/PortfolioService";
import AnalyticsTab from "./AnalyticsTab";
import PortfolioAnalyticsProps from "../../../model/portfolioAnalytics";
import PortfolioAnalyticsDTOProps from "../../../model/portfolioAnalyticsDTO";

interface IPortfolioProps {
  portfolioCoinArray: PortfolioCoinProps[];
  handleCloseAnalytics: () => void;
  openAnalytics: boolean;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
  maxHeight: "90%",
};

const AnalyticsModal = (props: IPortfolioProps) => {
  const { currency } = CryptoState();
  const [loading, setLoading] = useState<boolean>(true);
  const [analytics, setAnalytics] = useState<PortfolioAnalyticsProps>(
    {} as PortfolioAnalyticsProps
  );

  const totalSum = props.portfolioCoinArray.reduce(
    (partialSum: number, portfolioCoin: any) =>
      partialSum +
      portfolioCoin.coin.coinMarket[0].currentPrice * portfolioCoin.quantity,
    0
  );

  let count = -1;
  const [portfolioCoinDto] = useState<
    PortfolioAnalyticsDTOProps[]
  >(
    props.portfolioCoinArray.map((item: any) => {
      count += 1;
      return {
        keyNumber: count,
        coinId: item.coin.id,
        value:
          (item.quantity * item.coin.coinMarket[0].currentPrice) / totalSum,
      };
    })
  );

  const fetchPortfolioAnalytics = () => {
    PortfolioService.fetchPortfolioAnalytics(
      portfolioCoinDto,
      props.portfolioCoinArray.map((item: any) => item.coin.id).join(","),
      currency
    )
      .then((resp: ResponseProps) => setAnalytics(resp.data))
      .catch((err: ErrorProps) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => fetchPortfolioAnalytics(), [props.openAnalytics]);

  return (
    <Modal open={props.openAnalytics} onClose={props.handleCloseAnalytics}>
      <Box sx={style}>
        <Typography
          variant="h5"
          sx={{ display: "flex", justifyContent: "center" }}
        />
        <AnalyticsTab
          portfolioCoinArray={props.portfolioCoinArray}
          openAnalytics={props.openAnalytics}
          analytics={analytics}
          loading={loading}
          portfolioCoinDto={portfolioCoinDto}
        />
      </Box>
    </Modal>
  );
};

export default AnalyticsModal;
