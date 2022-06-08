import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { TOKEN_TAG } from '../../constant';
import styles from './index.module.scss'
const { confirm } = Modal;
const btnList = [
  {
    url:'/language',
    key:'language',
    label:'语言'
  },
  {
    url:'/videoAvatar',
    key:'videoAvatar',
    label:'角色'
  },
  {
    url:'/videoPlayer',
    key:'videoPlayer',
    label:'我的视频'
  },
  {
    url:'/doc',
    key:'doc',
    label:'产品文档'
  },
  {
    url:'/controlboard',
    key:'controlboard',
    label:'控制台'
  },
]
const NavBar: React.FC = props => {
  const [userName, setUserName] = useState<any>(sessionStorage.getItem('userName'));
  const [pathName, setPathName] = useState<any>(window.location.pathname);
  const navgiate = useNavigate()
  useEffect(() => {
    setUserName(sessionStorage.getItem('userName'))
  })
  const goHome = () => {
    navgiate('/')
  }
 
  const register = () => {
    navgiate('/register');
  }
  const login = () => {
    navgiate('/login');
  }
  const goNext =(value:string)=>{
    setPathName(value)
    navgiate(value);
  }
  const logout = () => {
    confirm({
      title: '退出登录',
      icon: <ExclamationCircleOutlined />,
      content: '您确定要退出登录吗?',
      okText: '确定退出',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        setUserName('')
        sessionStorage.clear()
      },
      onCancel() {
        console.log('Cancel');
      },
    });

  }
  return (
    <div className={styles.navbar__container}>
      <div onClick={()=>{goNext('/')}} className={styles.navbar__logo}>
        logo
      </div>
      <div className={styles.navbar_login}>
        {
          btnList.map((item:any)=>{
          return (<Button type='text' onClick={()=>{goNext(item.url)}} key={item.key} className={ pathName === item.url ?styles.navbar_login_cur:styles.navbar_login_btn}>{item.label}</Button>
          ) 
          })
        }
        {/* <Button type='text' onClick={()=>{goNext('/language')}} className={pathName===''?styles.navbar_login_cur:styles.navbar_login_btn}>语言</Button>
        <Button type='text' onClick={()=>{goNext('/videoAvatar')}}  className={styles.navbar_login_btn} >角色</Button>
        <Button type='text' onClick={()=>{goNext('/videoPlayer')}}  className={styles.navbar_login_btn}>我的视频</Button>
        <Button type='text' onClick={()=>{goNext('/doc')}}  className={styles.navbar_login_btn}>产品文档</Button>
        <Button type='text' onClick={()=>{goNext('/controlboard')}}  className={styles.navbar_login_btn} >控制台</Button> */}
        {
          sessionStorage.getItem(TOKEN_TAG) ? (
            <i>

              {userName}您好！
              <a onClick={logout}>注销</a>
            </i>
          ) : (
              <i>
                <Button type='text' onClick={login}  className={styles.navbar_login_btn }>登录</Button>
                <Button type='text' className={styles.navbar_login_btn } onClick={register}>注册</Button>
              </i>


            )
        }

      </div>
    </div>
  )
}
export default NavBar