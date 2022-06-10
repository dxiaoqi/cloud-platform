// @ts-nocheck
import HttpHandler from "../util/http";
// export const Login = HttpHandler.get("/login");
// mp3本地上传
export const upCheck = (url, data,header) => HttpHandler.post(url, data,header)
//  生成视频
export const videoSubmit = (url, data,header) => HttpHandler.post(url, data,header)
// 检测音频接口
export const genVoice  = (url, data,header) => HttpHandler.post(url, data,header)
// 视频是否生成成功
export const check = (url,data,header) => HttpHandler.post(url,data,header)
//  我的视频列表
export const videoList = (url,data,header) => HttpHandler.post(url,data,header)
// 我的音频列表
export const voiceList = (url,data,header) => HttpHandler.post(url,data,header)
// 生成音频
export const genVideo = (url,data,header) => HttpHandler.post(url,data,header)
//  图片列表 
export const userList = (url,data,header) => HttpHandler.post(url,data,header)
// 删除音频资源
export const deleteVoice = (url,data,header) => HttpHandler.post(url,data,header)