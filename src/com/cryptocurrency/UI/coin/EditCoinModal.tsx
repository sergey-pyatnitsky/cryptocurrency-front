import { Box, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "40%",
  height: "70%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const EditCoinModal = (props: any) => {


  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ fontWeight: 'bold' }}>
            Edit
            {" " + props.coin.name + " (" + props.coin.symbol.toUpperCase() + ")"}
          </Box>
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Edit
          {" " + props.coin.name + " EN Description:"}
        </Typography>
        <TextField
          placeholder="EN Description"
          multiline
          rows={4}
          maxRows={7}
          fullWidth
        />
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Edit
          {" " + props.coin.name + " RU Description:"}
        </Typography>
        <TextField
          placeholder="RU Description"
          multiline
          rows={4}
          maxRows={7}
          fullWidth
        />
        <Button variant="contained" sx={{ marginTop: 4, marginLeft: "40%" }}>Edit</Button>
      </Box>
    </Modal>
  )
}

export default EditCoinModal;