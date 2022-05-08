import { Button } from 'antd'
import React from 'react'
import styles from './index.module.scss'
const NavBar: React.FC = props=> {
  return (
    <div className={styles.navbar__container}>
      <div className={styles.navbar__logo}>
        AI
      </div>
      <div className={styles.navbar_login}>
        <Button type='text'>产品文档</Button>
        <Button type='text' >控制台</Button>
        <Button type='text' >登录</Button>
        <Button type='primary'>注册</Button>
      </div>
    </div>
  )
}
export default NavBar