import axios from "axios";
import {API_BASE_URL, LOGGED_USER_ROLE_KEY, TOKEN_HEADER, TOKEN_KEY} from "./CommonService";
import jwtDecode from "jwt-decode";

export interface JwtPayload {
    exp: string;
    iat: string;
    scopes: string;
    sum: string;
  }

class AuthenticationService {
    tryToLogin(username:string, password:string) {
        return axios.post(API_BASE_URL + '/auth/authenticate', {
            username, 
            password
        })
    }

    saveBearerAuthTokenToSessionStorage(token:string){
        sessionStorage.setItem(TOKEN_KEY, TOKEN_HEADER + token)
    }

    saveRoleLoggedUserToSessionStorage(role:string){
        sessionStorage.setItem(LOGGED_USER_ROLE_KEY, role)
    }

    getMainRoleFromDecodedJwtToken(token:string){
        const payload = jwtDecode(token) as JwtPayload;
        const role = payload.scopes.split(",")[0];
        this.saveRoleLoggedUserToSessionStorage(role)
        return role;
    }

};

export default new AuthenticationService();