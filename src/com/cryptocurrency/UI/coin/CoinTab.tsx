import {Box, Tab, Tabs} from '@mui/material'
import React, {useState} from 'react';
import CoinChart from './chart/CoinChart';
import CoinConverter from './CoinConverter';
import CoinProps from "../../model/coin";
import {useIntl} from "react-intl";

interface ICoinTabProps {
  coin: CoinProps
}

const CoinTab = ({coin}: ICoinTabProps) => {
  const intl = useIntl()
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{width: '100%'}}>
      <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label={intl.formatMessage({id: 'overview'})}/>
          <Tab label={intl.formatMessage({id: 'converter'})}/>
        </Tabs>
      </Box>
      <Box sx={{ padding: 2 }}>
        {value === 0 && (
          <CoinChart coin={coin}/>
        )}
        {value === 1 && (
          <CoinConverter coin={coin}/>
        )}
      </Box>
    </Box>
  )
}

export default CoinTab;