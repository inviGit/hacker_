import axios from "axios";
import interceptors from "../Interceptors";


class LoginAndRegistrationService {
  login(user) {
    const url = `${process.env.REACT_APP_BACKEND_API}/auth/login`;
    const data = user;
    const headers = {
      "Content-Type": "application/json",
    };
    return axios.post(url, data, headers);
  }

  registerUser(user) {
    const url = `${process.env.REACT_APP_BACKEND_API}/auth/register`;
    const data = user;
    const headers = {
      "Content-Type": "application/json",
    };
    return axios.post(url, data, headers);
  }

}

export default new LoginAndRegistrationService();
