import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
const NavBar: React.FC = props=> {
  const navgiate = useNavigate()
  const goHome = () => {
    navgiate('/')
  }
  const goDoc =() => {
    navgiate('/doc');
  }
  return (
    <div className={styles.navbar__container}>
      <div onClick={goHome} className={styles.navbar__logo}>
        首页
      </div>
      <div className={styles.navbar_login}>
        <Button type='text' onClick={goDoc}>产品文档</Button>
        <Button type='text' >控制台</Button>
        <Button type='text' >登录</Button>
        <Button type='primary'>注册</Button>
      </div>
    </div>
  )
}
export default NavBar