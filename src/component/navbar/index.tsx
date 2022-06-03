import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { TOKEN_TAG } from '../../constant';
import styles from './index.module.scss'
const { confirm } = Modal;
const NavBar: React.FC = props => {

  const [userName, setUserName] = useState<any>(sessionStorage.getItem('userName'));
  const navgiate = useNavigate()
  useEffect(() => {
    setUserName(sessionStorage.getItem('userName'))
  })
  const goHome = () => {
    navgiate('/')
  }
  const goDoc = () => {
    navgiate('/doc');
  }
  const controlboard = () => {
    navgiate('/controlboard');
  }
  const register = () => {
    navgiate('/register');
  }
  const login = () => {
    navgiate('/login');
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
      <div onClick={goHome} className={styles.navbar__logo}>
        首页
      </div>
      <div className={styles.navbar_login}>
        <Button type='text' onClick={goDoc}>产品文档</Button>
        <Button type='text' onClick={controlboard} >控制台</Button>
        {
          sessionStorage.getItem(TOKEN_TAG) ? (
            <i>

              {userName}您好！
              <a onClick={logout}>退出</a>
            </i>
          ) : (
              <i>
                <Button type='text' onClick={login}>登录</Button>
                <Button type='primary' onClick={register}>注册</Button>
              </i>


            )
        }

      </div>
    </div>
  )
}
export default NavBar