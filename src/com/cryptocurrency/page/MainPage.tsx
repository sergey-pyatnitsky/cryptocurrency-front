import Banner from '../UI/banner/Banner';
import { Navbar } from '../UI/navbar/Navbar';
import CoinsTable from '../UI/table/CoinsTable';

const MainPage = (props: any) => {

  return (
    <>
      <Navbar currentLocale={props.currentLocale} handleChangeLanguage={props.handleChangeLanguage} />
      <Banner />
      <CoinsTable />
    </>
  )
}

export default MainPage;