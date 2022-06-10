import { Tabs } from 'antd';
import React from 'react';
import NavBar from '../../component/navbar/index';
import Footer from '../../component/footer';
import VideoList from './videoList'
import AudioList from './audioList'
import styles from './index.module.scss';

const { TabPane } = Tabs;

const onChange = (key: string) => {
  console.log(key);
};

const VideoPlayer: React.FC = () => (
  <div>
    <NavBar />
    <div className={styles.nav_container}>
      <Tabs defaultActiveKey="1" onChange={onChange} >
        <TabPane tab="我的视频" key="1">
         <VideoList />
        </TabPane>
        <TabPane tab="我的音频" key="2">
         <AudioList />
        </TabPane>
        
      </Tabs>

    </div>

    <Footer />
  </div>

);

export default VideoPlayer