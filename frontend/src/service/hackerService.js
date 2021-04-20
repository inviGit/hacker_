import axios from "axios";
import interceptors from "../Interceptors";

class HackerService {
  getHacker(HackersId) {
    const url = `http://localhost:8081/hacker/byid/${HackersId}`;
    return axios.get(url);
  }

  getAllHackers() {
    const url = `http://localhost:8081/hacker/all`;
    return axios.get(url);
  }

  getHackersRank() {
    const url = `http://localhost:8081/hacker/ranks`;
    return axios.get(url);
  }

  removeHacker(HackersId) {
    const url = `http://localhost:8080/api/v1/Hackers/remove/${HackersId}`;
    return axios.delete(url);
  }
}

export default new HackerService();
