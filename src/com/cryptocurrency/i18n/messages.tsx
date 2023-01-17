import { LOCALES } from './locales';

export const messages = {
  [LOCALES.ENGLISH]: {
    //Error
    error_alert: 'Unexpected error',
      //Alert Title
    error: 'Error',
    success: "Success",
    warning: "Warning",
      //Input
    error_incorrect_entry: 'Incorrect entry',

    //Btn
    continue_btn: 'Next',
    yes_btn: 'Yes',
    no_btn: 'No',

    //AuthReg Form
    login_title: 'Authorization',
    continue_with_btn: 'or continue with',
    continue_google_btn: 'Google',
    login_image_text: 'Buy Crypto in Minutes',
    login_reg_link_text: 'Create an account',
    reg_title: 'Create account',
    reg_auth_link_text: 'Already registered?',
    pass_text: 'Password',
    full_name_text: 'Full name',
    full_name_placeholder: 'Ivanov Ivan Ivanovich',
      //Auth Error
    error_user_not_found: "User not found",
    error_invalid_password: "Invalid password",
    error_access_denied: "Access denied",
      //Reg Error
    error_repeat_password: "The password doesn't match or empty",
    error_user_exists: "This user already exists",
    error_invalid_data: "Incorrect data entry",

    //Logout
    logout_title: 'Do you really want to log out?',

    //Banner
    banner_text: 'Get all the Info regarding your favorite Crypto Currency',

    //CoinsTable
    coins_table_title: 'Cryptocurrency Prices',
    coins_table_search_text: 'Search For a Crypto Currency..',
    coins_table_column_1: 'Coin',
    coins_table_column_2: 'Price',
    coins_table_column_3: '24h Change',
    coins_table_column_4: 'Market Cap',
  },
  [LOCALES.RUSSIAN]: {
    //Error
    error_alert: 'Unexpected error',
      //Alert Title
    error: 'Ошибка',
    success: "Успешно",
    warning: "Предупреждение",
      //Input
    error_incorrect_entry: 'Неверный ввод',

    //Btn
    continue_btn: 'Далее',
    yes_btn: 'Да',
    no_btn: 'Нет',

    //AuthReg From
    login_title: 'Авторизация',
    continue_with_btn: 'или продолжить с',
    continue_google_btn: 'Google',
    login_image_text: 'Покупайте криптовалюту за считанные минуты',
    login_reg_link_text: 'Создать аккаунт',
    reg_title: 'Создание аккаунта',
    reg_auth_link_text: 'Уже зарегистрированы?',
    pass_text: 'Пароль',
    full_name_text: 'ФИО',
    full_name_placeholder: 'Иванов Иван Иванович',
      //Auth Error
    error_user_not_found: "Пользователь не найден",
    error_invalid_password: "Неверный пароль",
    error_access_denied: "Доступ запрещен",
      //Reg Error
    error_repeat_password: "Пароль не совпадает или пуст",
    error_user_exists: "Данный пользователь уже существует",
    error_invalid_data: "Неверный ввод данных",

    //Logout
    logout_title: 'Вы действительно хотите выйти из системы?',

    //Banner
    banner_text: 'Получите всю информацию о вашей любимой криптовалюте',

    //CoinsTable
    coins_table_title: 'Цены на криптовалюту',
    coins_table_search_text: 'Поиск криптовалюты..',
    coins_table_column_1: 'Монета',
    coins_table_column_2: 'Цена',
    coins_table_column_3: '24ч изменение',
    coins_table_column_4: 'Капитализация',
  }
}