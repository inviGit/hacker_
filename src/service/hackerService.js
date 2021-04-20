import axios from "axios";
import interceptors from "../Interceptors";

class HackerService {
  getHacker(HackersId) {
    const url = `${process.env.REACT_APP_BACKEND_API}/hacker/byid/${HackersId}`;
    return axios.get(url);
  }

  getAllHackers() {
    const url = `${process.env.REACT_APP_BACKEND_API}/hacker/all`;
    return axios.get(url);
  }

  getHackersRank() {
    const url = `${process.env.REACT_APP_BACKEND_API}/hacker/ranks`;
    return axios.get(url);
  }

  removeHacker(HackersId) {
    const url = `${process.env.REACT_APP_BACKEND_API}/hacker/remove/${HackersId}`;
    return axios.delete(url);
  }
}

export default new HackerService();
