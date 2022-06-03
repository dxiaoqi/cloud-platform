import React, { useState } from 'react'
import NavBar from '../../component/navbar/index';
import Footer from '../../component/footer';
import { Button, Modal } from 'antd'
import styles from'./index.module.scss'

const BtMap = [{
  key: 'woman',
  name: '女性角色声音',
  moive: [{
    text:'中国',
    url: 'http://www.w3schools.com/html/mov_bbb.mp4'
  }, {
    text:'中国',
    url: 'http://www.w3schools.com/html/mov_bbb.mp4'
  }, 
  {
    text:'中国',
    url: 'http://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    text:'中国',
    url: 'http://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    text:'中国',
    url: 'http://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    text:'中国',
    url: 'http://www.w3schools.com/html/mov_bbb.mp4'
  }]
  }, {
  key: 'man',
  name: '女性角色声音',
  moive: [{
    text:'中国',
    url: 'http://www.w3schools.com/html/mov_bbb.mp4'
  }]
  }]
const Avatar: React.FC = () => {
  const [type, setType] = useState<any>('woman')
  const [moives, setMoives] = useState<any>(BtMap[0].moive)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showMoive, setShowMoives] = useState<{text: string | undefined; url: string | undefined} | null>(null);
  const switchTab = (type: string) => {
    setType(type);
    setMoives((BtMap as any).find((item: { key: string; }) => item.key === type).moive)
  }
  return (
    <div>
    <NavBar />
      <div className={styles.container}>
        <div className={styles.avatar}>
          语种支持
        </div>
        <p className={styles.des}>您可以选择不同语种声音性别也可编辑</p>
        <div className={styles.bts}>
          {
            BtMap.map(b => {
              return (
                <Button type='primary'
                  className={
                    type === b.key ? '' : styles.active
                  } 
                  onClick={() => switchTab(b.key)}>
                  <p></p>{b.name}
                </Button>
              )
            })
          }
        </div>
        <div className={styles.languageList}>
          {
            moives.map((m: { url: string | undefined; text: string }) => {
              return (
                <Button type='dashed' onClick={() =>{
                  setShowMoives(m)
                  setIsModalVisible(true)
                }}>
                  {m.text}
                </Button>
              )
            })
          }
        </div>
      </div>
      <Modal className={styles.modal} title={showMoive?.text} visible={isModalVisible} footer={null}  onCancel={() => {setIsModalVisible(false) }}>
        <video className={styles.video} src={showMoive?.url} controls></video>
      </Modal>
      <Footer />
    </div>
  )
}
export default Avatar