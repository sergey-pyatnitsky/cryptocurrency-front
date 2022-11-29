import { Box, Typography, TextField, Button } from '@mui/material'
import { useCallback, useState } from 'react';
import { CryptoState } from '../../context/CryptoContext';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { couldStartTrivia } from 'typescript';

const CoinConverter = ({ coin }: any) => {
  const [inputValue, setInputValue] = useState<string>();
  const [outputValue, setOutputValue] = useState<string>();
  const { currency, symbol } = CryptoState();

  const handleNumberChange = (e: any) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, '');
    setInputValue(onlyNums)
    // console.log(onlyNums)
    // console.log(inputValue)
    handleConverterChange(onlyNums)
  }

  const handleConverterChange = (number: string) => {
    number != ''
      ? setOutputValue(
        Math.round((Number(number) * coin.market_data.current_price[currency.toLowerCase()] * 100) / 100).toString() + " " + symbol)
      : setOutputValue('')
  }

  let date = new Date(coin?.last_updated)

  return (
    <>
      <Typography variant="h5" sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ fontWeight: 'bold' }}>{coin?.name + " to " + currency}</Box>
      </Typography>
      <Box
        sx={{
          boxShadow: 0,
          width: '100%',
          height: '100%',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#808080 ' : '#C0C0C0'),
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          p: 1,
          m: 1,
          borderRadius: 2,
          textAlign: 'center',
          fontSize: '1rem',
          fontWeight: '700',
        }}
      >
        <TextField
          variant="outlined"
          onChange={handleNumberChange}
          value={inputValue}
          sx={{
            paddingTop: 2,
            paddingBottom: 2,
            'fieldset': {
              paddingLeft: (theme) => theme.spacing(2.5), borderRadius: '30px',
            },
          }}
        />
        <Button sx={{
          height: 50,
          marginTop: 2,
          marginBottom: 2,
        }}>
          <CompareArrowsIcon />
        </Button>
        <TextField
          variant="outlined"
          value={outputValue}
          sx={{
            paddingTop: 2,
            paddingBottom: 2,
            'fieldset': {
              paddingLeft: (theme) => theme.spacing(2.5), borderRadius: '30px',
            },
          }}
        />
        <Typography variant="h6">
          <Box sx={{ display: "flex", justifyConent: "left", fontWeight: 'bold' }}>
            {"1 " + coin.symbol.toUpperCase() + " = " + symbol + coin.market_data.current_price[currency.toLowerCase()]}
            <Box sx={{ display: "flex", justifyConent: "top", fontSize: 12 }}>
              {'   Last updated'}
              {
                new Intl.DateTimeFormat('en-US', {
                  year: 'numeric', month: '2-digit', day: '2-digit',
                  hour: '2-digit', minute: '2-digit', second: '2-digit'
                }).format(date)
              }
            </Box>
          </Box>
        </Typography>
      </Box>
    </>
  )
}

export default CoinConverter;