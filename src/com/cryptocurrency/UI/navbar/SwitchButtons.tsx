import { FormControl, Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { LOCALES } from '../../i18n/locales';
import { CryptoState } from '../../context/CryptoContext';
import { ReactNode } from 'react';
import { SelectChangeEvent } from "@mui/material";

interface IProps {
  isAuth: boolean;
  currentLocale: string;
  handleChangeLanguage: (event: SelectChangeEvent<string>, child: ReactNode) => void;
}

const languages = [
  { name: 'English', code: LOCALES.ENGLISH },
  { name: 'Русский', code: LOCALES.RUSSIAN }
]

const SwitchButtons = (props: IProps) => {
  const { currency, setCurrency } = CryptoState();

  return (
    <>
      <FormControl size="small">
        <Select
          variant="outlined"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currency}
          style={{ width: 100, height: 40, marginLeft: 15 }}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <MenuItem value={"USD"}>USD</MenuItem>
          <MenuItem value={"EUR"}>EUR</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small">
        <Select
          onChange={props.handleChangeLanguage}
          defaultValue={props.currentLocale}
        >
          {languages.map(languages => {
            return (
              <MenuItem key={languages.code} value={languages.code}>
                {languages.name}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </>
  )
}

export default SwitchButtons