import { LOCALES } from "./locales";

export const messages = {
  [LOCALES.ENGLISH]: {
    //Error
    error_alert: "Unexpected error",
    //Alert Title
    error: "Error",
    success: "Success",
    warning: "Warning",
    //Input
    error_incorrect_entry: "Incorrect entry",

    //Btn
    continue_btn: "Next",
    yes_btn: "Yes",
    no_btn: "No",
    save: "Save",

    //AuthReg Form
    login_title: "Authorization",
    continue_with_btn: "or continue with",
    continue_google_btn: "Google",
    login_image_text: "Buy Crypto in Minutes",
    login_reg_link_text: "Create an account",
    reg_title: "Create account",
    reg_auth_link_text: "Already registered?",
    pass_text: "Password",
    full_name_text: "Full name",
    full_name_placeholder: "Ivanov Ivan Ivanovich",
    //Auth Error
    error_user_not_found: "User not found",
    error_invalid_password: "Invalid password",
    error_access_denied: "Access denied",
    //Reg Error
    error_repeat_password: "The password doesn't match or empty",
    error_user_exists: "This user already exists",
    error_invalid_data: "Incorrect data entry",

    //Logout
    logout_title: "Do you really want to log out?",

    //Banner
    banner_text: "Get all the Info regarding your favorite Crypto Currency",

    //CoinsTable
    coins_table_title: "Cryptocurrency Prices",
    coins_table_search_text: "Search For a Crypto Currency..",
    coins_table_column_1: "Coin",
    coins_table_column_2: "Price",
    coins_table_column_3: "24h Change",
    coins_table_column_4: "Market Cap",

    //CoinPage
    info: "Information",
    price_statistics: "Price Statistics",
    coin_price_change_7d: "Price change for 7d",
    coin_price_change_14d: "Price change for 14d",
    coin_price_change_30d: "Price change for 30d",
    coin_price_change_200d: "Price change for 200d",
    price_past: "Price ( Past",
    price_in: "Days ) in",
    price_chart: "Price Chart",
    overview: "Overview",
    converter: "Converter",
    add_to_favorite: "Add Favorite",
    add_price_alert: "Add Price Alert",
    //CoinPage Error
    access_denied_auth_to_continue: "Access is denied! Log in to continue",

    //Coin Market Info
    market_cap: "Market Cap",
    market_cap_info:
      "Market Cap = Current Price x Circulating Supply\n\n" +
      "Refers to the total market value of a cryptocurrency’s circulating supply. It is similar to the stock " +
      "market’s measurement of multiplying price per share by shares readily available in the market (not held " +
      "& locked by insiders, governments)",
    total_supply: "Total Supply",
    total_supply_info:
      "The amount of coins that have already been created, minus any coins that have been burned " +
      "(removed from circulation). It is comparable to outstanding shares in the stock market.\n\n" +
      "Total Supply = Onchain supply - burned tokens",
    max_supply: "Max Supply",
    max_supply_info:
      "The maximum number of coins coded to exist in the lifetime of the cryptocurrency. It is " +
      "comparable to the maximum number of issuable shares in the stock market.\n\n" +
      "Max Supply = Theoretical maximum as coded",
    circulating_supply: "Circulating Supply",
    circulating_supply_info:
      "The amount of coins that are circulating in the market and are tradeable by the " +
      "public. It is comparable to looking at shares readily available in the market (not held & locked by " +
      "insiders, governments).",
    fully_diluted_valuation: "Fully Diluted Valuation",
    fully_diluted_valuation_info:
      "FDV = Current Price x Max Supply (or total supply if max supply is invalid)\n\n" +
      "The market capitalization (valuation) if the max supply of a coin is in circulation. Note that it can take " +
      "3, 5, 10 or more years before the FDV can be reached, depending on how the emission schedule is designed.",

    //Coin converter
    coin_to: "to",
    coin_info_last_updated: "Last updated",
  },
  [LOCALES.RUSSIAN]: {
    //Error
    error_alert: "Unexpected error",
    //Alert Title
    error: "Ошибка",
    success: "Успешно",
    warning: "Предупреждение",
    //Input
    error_incorrect_entry: "Неверный ввод",

    //Btn
    continue_btn: "Далее",
    yes_btn: "Да",
    no_btn: "Нет",
    save: "Сохранить",

    //AuthReg From
    login_title: "Авторизация",
    continue_with_btn: "или продолжить с",
    continue_google_btn: "Google",
    login_image_text: "Покупайте криптовалюту за считанные минуты",
    login_reg_link_text: "Создать аккаунт",
    reg_title: "Создание аккаунта",
    reg_auth_link_text: "Уже зарегистрированы?",
    pass_text: "Пароль",
    full_name_text: "ФИО",
    full_name_placeholder: "Иванов Иван Иванович",
    //Auth Error
    error_user_not_found: "Пользователь не найден",
    error_invalid_password: "Неверный пароль",
    error_access_denied: "Доступ запрещен",
    //Reg Error
    error_repeat_password: "Пароль не совпадает или пуст",
    error_user_exists: "Данный пользователь уже существует",
    error_invalid_data: "Неверный ввод данных",

    //Logout
    logout_title: "Вы действительно хотите выйти из системы?",

    //Banner
    banner_text: "Получите всю информацию о вашей любимой криптовалюте",

    //CoinsTable
    coins_table_title: "Цены на криптовалюту",
    coins_table_search_text: "Поиск криптовалюты..",
    coins_table_column_1: "Монета",
    coins_table_column_2: "Цена",
    coins_table_column_3: "24ч изменение",
    coins_table_column_4: "Капитализация",

    //CoinPage
    info: "Информация",
    price_statistics: "Статистика Цены",
    coin_price_change_7d: "Изменение цены за 7д",
    coin_price_change_14d: "Изменение цены за 14д",
    coin_price_change_30d: "Изменение цены за 30д",
    coin_price_change_200d: "Изменение цены за 200д",
    price_past: "Цена (За последние",
    price_in: "д) в",
    price_chart: "График Цены",
    overview: "Обзор",
    converter: "Конвертер",
    add_to_favorite: "Добавить в отслеживаемые",
    add_price_alert: "Добавить уведомление о цене",
    //CoinPage Error
    access_denied_auth_to_continue:
      "Доступ запрещён! Авторизируйтесь, чтобы продолжить",

    //Coin Market Info
    market_cap: "Рыночная капитализация",
    market_cap_info:
      "Рыночная капитализация = текущая цена x количество монет в обращении\n\nЭто общая " +
      "рыночная стоимость всех монет в обращении. Ее можно сравнить со стоимостью акций на рынке, когда цена " +
      "одной акции умножается на количество всех доступных на рынке (не во владении инсайдеров и правительств).",
    total_supply: "Общее предложение",
    total_supply_info:
      "Количество уже созданных монет, за исключением тех, что были сожжены (убраны из обращения). " +
      "Сравните с количеством акций, выпущенных в обращение.\n\nОбщий объем предложения = объем предложения " +
      "ончейн – сожженные токены",
    max_supply: "Максимальный объем",
    max_supply_info:
      "Максимальное количество монет, прописанное в коде блокчейна. Его можно сравнить с максимальным " +
      "количеством акций, которые можно выпустить на рынок.\n\nМаксимальное количество монет = теоретический " +
      "максимум, прописанный в коде",
    circulating_supply: "В обращении",
    circulating_supply_info:
      "Количество монет, которые выпущены в публичное обращение. Сравните с доступными на " +
      "рынке акциями, которые не находятся во владении инсайдеров и правительств.",
    fully_diluted_valuation: "Полностью разбавленная капитализация",
    fully_diluted_valuation_info:
      "FDV = текущая цена x максимальное предложение (или общее предложение, если " +
      "максимальное недействительно)\n\nРыночная капитализация (оценочная), если максимальное предложение токенов " +
      "уже находится в обращении. Обратите внимание, что на достижение FDV может уйти 3,5, 10 и больше лет в " +
      "зависимости от графика выпуска.",

    //Coin converter
    coin_to: "в",
    coin_info_last_updated: "Последнее обновление",
  },
};
