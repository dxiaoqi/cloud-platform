import React from "react";
import styles from "./index.module.scss";
const Footer: React.FC = props => {
  return (<div className={styles.footer}>
    <div className={styles.footer_info}>
    <p className={styles.footerLogo}>
        metaboy
      </p>
      <p>北京直引科技有限公司     </p>
      <p>版权所有 © 2021-{new Date().getFullYear()} AI Algorithms</p>
    </div>
  </div>)
}
export default Footer;