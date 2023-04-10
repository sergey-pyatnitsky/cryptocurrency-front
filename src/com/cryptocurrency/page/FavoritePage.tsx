import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { useIntl } from "react-intl";
import FavoritesCoinsTable from "../UI/table/FavoritesCoinsTable";
import PriceAlertsTable from "../UI/table/PriceAlertsTable";

const FavoritesPage = () => {
  const intl = useIntl();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) =>
    setValue(newValue);

  return (
    <Box sx={{ width: "100%", marginTop: 3 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label={intl.formatMessage({ id: "favorites" })} />
          <Tab label={intl.formatMessage({ id: "price_alerts" })} />
        </Tabs>
      </Box>
      <Box sx={{ padding: 2 }}>
        {value === 0 && <FavoritesCoinsTable />}
        {value === 1 && <PriceAlertsTable />}
      </Box>
    </Box>
  );
};

export default FavoritesPage;
