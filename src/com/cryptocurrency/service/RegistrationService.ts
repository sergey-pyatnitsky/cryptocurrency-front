import axios from "axios";
import {API_BASE_URL} from "./CommonService";

let config;

export default class RegistrationService {

  static async register(body: any) {
    let locale = localStorage.getItem('locale')
    if(locale == null)
      locale = "ru"

    config = {
      method: 'post',
      url: API_BASE_URL + "/auth/registration?locale=" + locale.split('-')[0],
      data: body
    }
    return axios(config);
  }
}