import axios from "axios";
import { API_BASE_URL } from "./CommonService";

let config;

export default class RegistrationService {

  static async register(body: any) {
    config = {
      method: 'post',
      url: API_BASE_URL + "/auth/registration",
      data: body
    }
    return axios(config);
  }
}