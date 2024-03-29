import axios from "axios";
import ProfileProps from "../model/profile";
import { API_BASE_URL } from "./CommonService";

export default class UserService {

    static async fetchProfileInfo(username:string | null) {
        axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token")
        return axios.get(API_BASE_URL + '/user/profile/' + username)
    }

    static async fetchAllUsers() {
      axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token")
      return axios.get(API_BASE_URL + '/user/get_all')
    }

    static async editUserRole(username: string | undefined, role: string) {
      axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token")
      return axios.put(API_BASE_URL + `/user/change_role/${username}/${role}`)
    }

    static async activateUser(username: string, active: boolean) {
      axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token")
      return axios.put(API_BASE_URL + `/user/activate/${username}/${active}`)
    }

    static async removeUser(username: string) {
      axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token")
      return axios.delete(API_BASE_URL + `/user/remove/${username}`)
    }

    static async saveProfileImage(file: Blob ,  username: string | null) {
      axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token")
        let formData = new FormData();
        formData.append("file", file);
      return await axios.post(`http://localhost:8080/profile/uploadFile/${username}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })
    }

    static async changeUserInfo(profileInfo: ProfileProps ,  username: string | null) {
      axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token")
      return await axios.post(`http://localhost:8080/user/profile/edit/${username}`, 
      {
        name: profileInfo.name,
        email: profileInfo.email,
        phone: profileInfo.phone,
        country: profileInfo.country,
        address: profileInfo.address
      })
    }

    static async changeUserPassword(old_password:string, password: string ,  username: string | null) {
      axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token")
      return await axios.post(`http://localhost:8080/user/profile/edit_password/${username}?old_pass=${old_password}`, 
      {
        username: username,
        password: password
      })
    }
}