import axios from "axios";
import {API_BASE_URL, LOGGED_USER_ROLE_KEY, LOGGED_USER_USERNAME_KEY, TOKEN_HEADER, TOKEN_KEY} from "./CommonService";
import jwtDecode from "jwt-decode";

export interface JwtPayload {
    exp: string;
    iat: string;
    scopes: string;
    sub: string;
  }

export default class AuthenticationService {
    static tryToLogin(username:string, password:string) {
        return axios.post(API_BASE_URL + '/auth/authenticate', {
            username, 
            password
        })
    }

    static saveBearerAuthTokenToSessionStorage(token:string){
        sessionStorage.setItem(TOKEN_KEY, TOKEN_HEADER + token)
    }

    static saveRoleLoggedUserToSessionStorage(role:string){
        sessionStorage.setItem(LOGGED_USER_ROLE_KEY, role)
    }

    static saveUsernameLoggedUserToSessionStorage(username:string){
        sessionStorage.setItem(LOGGED_USER_USERNAME_KEY, username)
    }

    static getMainRoleFromDecodedJwtToken(token:string){
        const payload = jwtDecode(token) as JwtPayload;
        console.log(payload);
        const role = payload.scopes.split(",")[0];
        this.saveRoleLoggedUserToSessionStorage(role)
        this.saveUsernameLoggedUserToSessionStorage(payload.sub)
        return role;
    }

}