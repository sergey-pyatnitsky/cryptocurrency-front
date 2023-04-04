import CoinProps from "./coin";
import DesignationProps from "./designation";

interface PriceAlertProps {
    id: string
    coin: CoinProps
    designation: DesignationProps
    price: number
}
  
export default PriceAlertProps;