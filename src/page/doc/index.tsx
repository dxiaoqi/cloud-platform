import React from "react";
import NavBar from "../../component/navbar";
import Footer from "../../component/footer";
// @ts-ignore
import Md from '../../assert/doc.md';
import styles from "./index.module.scss";
const Doc: React.FC = (props) => {
  return (
    <div className={styles.body}>
      <NavBar />
      <div className={styles.container}>
        <div  dangerouslySetInnerHTML={{ __html: `${Md}`}}/>
      </div>
      <Footer />
    </div>
  )
}
export default Doc;