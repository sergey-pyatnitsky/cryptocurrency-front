import {Alert, AlertColor, AlertTitle} from "@mui/material";
import React, {Dispatch, SetStateAction} from "react";
import {useIntl} from "react-intl";

interface IProps {
  severity: AlertColor | undefined
  errorMsg: string
  error: {
    alertError: boolean
    [key: string]: any
  }
  setError: Dispatch<SetStateAction<any>>
}

const CustomAlert = (errorProps: IProps) => {
  const intl = useIntl()

  let alertTitle: string
  if(errorProps.severity == 'error')
    alertTitle = intl.formatMessage({id: 'error'})
  else if(errorProps.severity == 'success')
    alertTitle = intl.formatMessage({id: 'success'})
  else alertTitle = intl.formatMessage({id: 'warning'})

  return (
    <Alert
      severity={errorProps.severity}
      sx={{
        position: "absolute",
        right: 20,
        bottom: 20,
        border: 1
      }}
      onClose={() => {
        errorProps.setError({...errorProps.error, alertError: false})
      }}
    >
      <AlertTitle>{alertTitle}</AlertTitle>
      {errorProps.errorMsg}
    </Alert>
  )
}

export default CustomAlert;