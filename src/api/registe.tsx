// @ts-nocheck
import HttpHandler from "../util/http";
// export const Login = HttpHandler.get("/login");


export const registe = (url, data) => HttpHandler.post(url, data)
export const login = (url, data) => HttpHandler.post(url, data)
export const users = (url,data,header) => HttpHandler.post(url,data,header)
export const account = (url,data,header) => HttpHandler.post(url,data,header)
export const setappId = (url,data,header) => HttpHandler.post(url,data,header)
export const sms = (url) => HttpHandler.post(url)
export const updateSms = (url) => HttpHandler.post(url)
export const updatePwd = (url, data) => HttpHandler.post(url,data)