import React, { Fragment, useState,useEffect } from "react";
import { Tabs, Radio } from 'antd';
import UserComponent from "../user"
import NavBar from '../../component/navbar/index';

import ApplicationComponent from "../application"
import styles from './index.module.scss'

const { TabPane } = Tabs;
const ControlBoard: React.FC = (props) => {
    const [mode, setMode] = useState<any>('left')
   
    return (
        <Fragment>
            
            <NavBar />
            <div className={styles.menu_container} >
                {/* <div className={styles.logo} >账号中心 </div> */}
                <Tabs defaultActiveKey="1"  tabPosition={mode} className={styles.menu_tabs}>
                    <TabPane tab="用户信息" key="1" className={styles.menu_tab}>
                        <UserComponent />
                     </TabPane>
                    <TabPane tab="应用信息" key="2" className={styles.menu_tab}>
                        <ApplicationComponent />
                     </TabPane>
                </Tabs>
               
            </div>
        </Fragment>
    )
}
export default ControlBoard;
