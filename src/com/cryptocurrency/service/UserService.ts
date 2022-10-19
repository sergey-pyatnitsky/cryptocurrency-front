import axios from "axios";
import {API_BASE_URL, LOGGED_USER_ROLE_KEY, LOGGED_USER_USERNAME_KEY, TOKEN_HEADER, TOKEN_KEY} from "./CommonService";
import jwtDecode from "jwt-decode";

interface IProfileProps{
  "id": number
  "user": {
    "username": string
    "password": string
    "active": boolean
    "authority": {
      "role": string
    }
  }
  "name": string
  "email": string
  "phone": string
  "country": string
  "address": string
  "imageId": string
}

class UserService {
    fetchProfileInfo(username:string) {
      axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token")
        return axios.get(API_BASE_URL + '/user/profile/' + username)
    }

    async fetchProfileImageId(username: string){
      axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token")
        const {data} =  await axios.get(API_BASE_URL + '/user/profile/' + username)
        sessionStorage.setItem("image_id", data.imageId)
        return data.imageId
    }
};

export default new UserService();