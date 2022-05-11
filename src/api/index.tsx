// @ts-nocheck
import HttpHandler from "../util/http";
import { Img, Picture, Meta, Face, Splite, Target, SuperPoint, CartonFace, PurgFace, Virtual } from "../assert/svg";
// export const Login = HttpHandler.get("/login");
export const getProductList = () => new Promise(function(resolve, reject) {
  const data = [{
    title: '图像处理',
    description: '人脸重建，语义分割，目标检测，图像超分',
    icon: Img
  }, {
    title: '内容生成',
    description: '动漫脸, 超清换脸',
    icon: Picture
  }, {
    title: '元宇宙相关',
    description: '虚拟形象定制',
    icon: Meta

  }, {
    title: '人脸重建',
    description: '根据图像或视频重建出人脸3D模型，能很好的恢复输入图像的表情和面部细节',
    icon: Face
  }, {
    title: '语义分割',
    description: '高精度识别目标区域的轮廓，IOU指标业界领先',
    icon: Splite
  }, {
    title: '目标检测',
    description: '对特定目标进行检测、跟踪，常应用于交通，安防等场景',
    icon: Target
  }, {
    title: '图像超分',
    description: '对模糊、低分辨率的图像进行重建，得到更清晰、分辨率更高、更接近于真实的人脸',
    icon: SuperPoint
  }, {
    title: '动漫脸',
    description: '将人脸图像转换为特定的二次元风格',
    icon: CartonFace
  }, {
    title: '超清换脸',
    description: '通过特定AI技术，将用户人像与特定人像进行面部融合，使生成图同时具备用户人像与特定人像的外貌特征',
    icon: PurgFace
  }, {
    title: '虚拟形象',
    description: '个性化定制3D虚拟形象，支持实时表情驱动、肢体驱动，可实现虚拟主播、虚拟教师、虚拟偶像等创新互动场景',
    icon: Virtual
  }]
  resolve(data);
});