import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useIntl } from "react-intl";
import ErrorProps from "../../model/error";
import PortfolioCoinDTOProps from "../../model/portfolioCoinDTO";
import PortfolioService from "../../service/PortfolioService";
import ChooseCoinsTable from "../table/ChooseCoinsTable";
import {CryptoState} from "../../context/CryptoContext";

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
  maxHeight: "85%",
};

interface IAddCoinPortfolioModalProps {
  handleCloseAdd: () => void;
  openAdd: boolean;
  portfolioName: string;
  fetchPortfolio: (currency:string) => void;
}

const AddCoinPortfolioModal = (props: IAddCoinPortfolioModalProps) => {
  const intl = useIntl();
  const { currency } = CryptoState();
  const [portfolioCoinDto, setPortfolioCoinDto] =
    useState<PortfolioCoinDTOProps>({} as PortfolioCoinDTOProps);

  const addPortfolioCoin = () => {
    setPortfolioCoinDto({
      ...portfolioCoinDto,
      portfolioName: props.portfolioName,
    });
    PortfolioService.addPortfolioCoin(portfolioCoinDto)
      .then(() => props.fetchPortfolio(currency))
      .catch((err: ErrorProps) => console.log(err));
  };

  return (
    <>
      <Modal open={props.openAdd} onClose={props.handleCloseAdd}>
        <Box sx={style}>
          <Typography
            variant="h5"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box sx={{ fontWeight: "bold", marginBottom: 2 }}>
              {intl.formatMessage({ id: "add_to_portfolio" })}
            </Box>
          </Typography>
          <ChooseCoinsTable
            portfolioCoinDto={portfolioCoinDto}
            setPortfolioCoinDto={setPortfolioCoinDto}
            addPortfolioCoin={addPortfolioCoin}
          />
        </Box>
      </Modal>
    </>
  );
};

export default AddCoinPortfolioModal;
