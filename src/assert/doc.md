---
title: 产品文档
renderNumberedHeading: true
grammar_cjkRuby: true
---
[TOC]
# 产品接口
## 换发接口
	请求方法：
		支持的HTTP请求方法：POST
	接口信息：
		 api.zhiyinmeta.com/v1/接口名称
### 发型
	接口名称：aiImg
| 参数名称   | 参数类型      | 说明 |
| ----   |---- | ---- |
| img       | base64 string | 必选 |
| hairstyle | string        | 必选 |

### 发色
	接口名称：hairColor
| 参数名称| 参数类型| 说明|
| - | - | - |
| haircolor1 | string        | 必选                   |
| haircolor2 | string        | 非必选，选择时为渐变色 |
| type       | int [0, 1 ,2] | 必选                   |
| label      | int [0, 1]    | 必选                   |
| img        | base64 string | 必选                   |
### 发际线修复
	接口名称：hairLine
| 参数名称 | 参数类型      | 说明 |
| -------- | ------------- | ---- |
| img      | base64 string | 必选 |
### 地中海发型修复
	接口名称：overCrown
| 参数名称 | 参数类型      | 说明 |
| -------- | ------------- | ---- |
| img      | base64 string | 必选 |
# 常见问题
## 如何开始？

	 **1. Step1 注册登录** 
		作为新用户，请通过首页右上角的注册按钮跳转到页面进行注册，注册成功后即可开始体验产品
		
	2.Step2 产品体验
		点击主页的产品功能即可进入到产品体验区,目前支持本地图像上传和URL上传两种,如果有大量调用的		需求请联系我们
## API如何接入？
## 状态码查询
## 商务合作怎么办？

