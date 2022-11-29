import Button from '@mui/material/Button';

const SelectButton = ({ children, selected, onClick }: any) => {
  // const useStyles = makeStyles({
  //   selectbutton: {
  //     border: "1px solid gold",
  //     borderRadius: 5,
  //     padding: 10,
  //     paddingLeft: 20,
  //     paddingRight: 20,
  //     fontFamily: "Montserrat",
  //     cursor: "pointer",
  //     backgroundColor: selected ? "gold" : "",
  //     color: selected ? "black" : "",
  //     fontWeight: selected ? 700 : 500,
  //     "&:hover": {
  //       backgroundColor: "gold",
  //       color: "black",
  //     },
  //     width: "22%",
  //     //   margin: 5,
  //   },
  // });

  // const classes = useStyles();

  return (
    <>
      <Button
        variant="outlined"
        onClick={onClick}
        sx={{ width: 20 }}
        disabled={selected}
      >
        {children}
      </Button>
    </>
  );
};

export default SelectButton;