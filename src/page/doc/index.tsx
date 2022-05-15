import React from "react";
import { Table } from 'antd'
import NavBar from "../../component/navbar";
import Footer from "../../component/footer";
import styles from "./index.module.scss";
// @ts-ignore
const columns = [
  {
    title: '参数名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '参数类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '说明',
    dataIndex: 'des',
    key: 'des',
  },
];
const Doc: React.FC = (props) => {
  return (
    <div className={styles.body}>
      <NavBar />
      <div className={styles.container}>
        <h1>产品接口</h1>
        <h2>换发接口</h2>
        <div className={styles.panel}>
          <p>请求方法：</p>
          <p>  支持的HTTP请求方法：POST</p>
          <p>接口信息：</p>
          <p>  api.zhiyinmeta.com/v1/接口名称</p>
        </div>
        <div>
          <h3>发型</h3>
          <div className={styles.panel}>
            接口名称：aiImg
          </div>
        <Table dataSource={[{
          name: 'img',
          type: 'base64 string',
          des: '必选'
        }, {
          name: 'hairstyle',
          type: 'string',
          des: '必选'
        }]} columns={columns} pagination={false} />;
        </div>
        <div>
          <h3>发色</h3>
          <div className={styles.panel}>
            接口名称：hairColor
          </div>
        <Table dataSource={[{
          name: 'img',
          type: 'base64 string',
          des: '必选'
        }, {
          name: 'haircolor1',
          type: 'string',
          des: '必选'
        }, {
          name: 'haircolor2',
          type: 'string',
          des: '非必选，选择时为渐变色'
        }, {
          name: 'type',
          type: 'int [0, 1, 2]',
          des: '必选'
        }, {
          name: 'label',
          type: 'int [0, 1]',
          des: '必选'
        }]} columns={columns} pagination={false} />;
        </div>
        <div>
          <h3>发际线修复</h3>
          <div className={styles.panel}>
            接口名称：hairLine
          </div>
        <Table dataSource={[{
          name: 'img',
          type: 'base64 string',
          des: '必选'
        }]} columns={columns} pagination={false} />
        </div>
        <div>
          <h3>地中海发型修复</h3>
          <div className={styles.panel}>
            接口名称：overCrown
          </div>
        <Table dataSource={[{
          name: 'img',
          type: 'base64 string',
          des: '必选'
        }]} columns={columns} pagination={false} />;
        </div>
        <div>
          <h1>常见问题</h1>
          <h2>如何开始？</h2>
          <div className={styles.panel}>
          <p>Step1 注册登录</p>
          <p> 作为新用户，请通过首页右上角的注册按钮跳转到页面进行注册，注册成功后即可开始体验产品</p>
	
          <p>Step2 产品体验</p>
	        <p>  点击主页的产品功能即可进入到产品体验区,目前支持本地图像上传和URL上传两种,如果有大量调用的		需求请联系我们</p>
        </div>
        </div>
        <h1>API如何接入？</h1>
        <h1>状态码查询</h1>
        <h1>商务合作怎么办？</h1>
      </div>
      <Footer />
    </div>
  )
}
export default Doc;