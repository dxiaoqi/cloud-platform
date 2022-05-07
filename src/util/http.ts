import axios from "axios";
import { TOKEN_TAG } from "../constant";
class HttpHandler {
  constructor() {
    this.axios = axios.create({
      baseURL: '',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `${localStorage.getItem(TOKEN_TAG)}`,
      },
    });
  }
  axios: any;
  get = async (url: string) => {
    return await this.axios.get(url);
  }
  post = async (url: string, data: any) => {
    return await this.axios.post(url, data);
  }
  put = async (url: string, data: any) => {
    return await this.axios.put(url, data);
  }
  delete = async (url: string) => {
    return await this.axios.delete(url);
  }
}

export default new HttpHandler();