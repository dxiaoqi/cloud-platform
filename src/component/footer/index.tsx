import React from "react";
import styles from "./index.module.scss";
const Footer: React.FC = props => {
  return (<div className={styles.footer}>
    <div className={styles.footer_info}>
      <p>北京直引科技有限公司     </p>
      <p>版权所有 © 2019-2020 AI Algorithms</p>
    </div>
  </div>)
}
export default Footer;