import axios from "axios";
import { TOKEN_TAG } from "../constant";
class HttpHandler {
  constructor() {
    this.axios = axios.create({
      baseURL: 'http://api.zhiyinmeta.com/v1/',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Authorization: `${localStorage.getItem(TOKEN_TAG)}`,        
        // Token: `${sessionStorage.getItem(TOKEN_TAG)}`,
        // Authorization: "Basic "  + 'MTIzNDU2OjEyMzQ1Njc4OTA='//`${localStorage.getItem(TOKEN_TAG)}`,
      },
    });
  }
  axios: any;
  get = async (url: string,header:any) => {
    return await this.axios.get(url,header);
  }
  post = async (url: string, data: any,header:any) => {    
    return await this.axios.post(url, data,header);
  }
  put = async (url: string, data: any,header:any) => {
    return await this.axios.put(url, data,header);
  }
  delete = async (url: string,header:any) => {
    return await this.axios.delete(url,header);
  }
}

export default new HttpHandler();