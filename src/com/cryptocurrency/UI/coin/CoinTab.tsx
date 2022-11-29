import { Typography, Box, Tabs, Tab } from '@mui/material'
import { useState } from 'react';
import CoinChart from './chart/CoinChart';
import CoinConverter from './CoinConverter';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const CoinTab = ({ coin }: any) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Overview" />
          <Tab label="Converter" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <CoinChart coin={coin} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CoinConverter coin={coin} />
      </TabPanel>
    </Box>
  )
}

export default CoinTab;