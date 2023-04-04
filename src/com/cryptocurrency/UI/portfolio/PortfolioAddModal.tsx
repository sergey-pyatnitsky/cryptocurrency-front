import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useIntl } from "react-intl";
import ErrorProps from "../../model/error";
import PortfolioService from "../../service/PortfolioService";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const PortfolioAddModal = (props: any) => {
  const intl = useIntl();
  const [portfolio, setPortfolio] = useState({ name: "" });

  const addPortfolio = (e: any) => {
    e.preventDefault();

    PortfolioService.addPortfolio(
      sessionStorage.getItem("username"),
      portfolio.name
    )
      .then(() => props.handleCloseCreate())
      .catch((err: ErrorProps) => console.log(err));
  };

  return (
    <Modal
      open={props.openCreate}
      onClose={props.handleCloseCreate}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h5">
          <Box sx={{ fontWeight: "bold" }}>
            {intl.formatMessage({ id: "create_portfolio" })}
          </Box>
        </Typography>
        <Box>
          <TextField
            id="outlined-error-helper-text"
            label={intl.formatMessage({ id: "name" })}
            sx={{ marginTop: 2, width: "100%" }}
            onChange={(e) =>
              setPortfolio({ ...portfolio, name: e.target.value })
            }
          />
        </Box>
        <Box sx={{ marginTop: 2 }}>
          <Button
            variant="contained"
            sx={{ marginLeft: "70%" }}
            onClick={addPortfolio}
          >
            {intl.formatMessage({ id: "create" })}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PortfolioAddModal;
