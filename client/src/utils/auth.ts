import { JwtPayload, jwtDecode } from 'jwt-decode';
import { UserData } from '../interfaces/UserData';

class AuthService {
  getProfile() {
    //return the decoded token
    return jwtDecode<UserData>(this.getToken());
  }

  loggedIn() {
    //return a value that indicates if the user is logged in
    const token = this.getToken();
    return token;
  }
  
  isTokenExpired(token: string) {
    try {
          //return a value that indicates if the token is expired
    const decoded = jwtDecode<JwtPayload>(token);

    if (decoded?.exp && decoded?.exp < Date.now () / 1000) {
      return true;
    }
    } catch (error) {
      return false;
    }
  }

  getToken(): string {
    //return the token
    const loggedUser = localStorage.getItem('id_token') || '';
    return loggedUser
  }

  login(idToken: string) {
    //set the token to localStorage
    localStorage.setItem('id_token', idToken);
    //redirect to the home page
    window.location.assign("/");
  }

  logout() {
    //remove the token from localStorage
    localStorage.removeItem('id_token');
    //redirect to the login page
    window.location.assign("/login")
  }
}

export default new AuthService();