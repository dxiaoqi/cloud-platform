import React, { useState } from 'react'
import NavBar from '../../component/navbar/index';
import Footer from '../../component/footer';
import { Button } from 'antd'
import styles from'./index.module.scss'
const BtMap = [{
  key: 'edu',
  name: '教育',
  moive: [{
    url: 'http://www.w3schools.com/html/mov_bbb.mp4'
  }, {
    url: 'http://www.w3schools.com/html/mov_bbb.mp4'
  }, 
  {
    url: 'http://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    url: 'http://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    url: 'http://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    url: 'http://www.w3schools.com/html/mov_bbb.mp4'
  }]
  }, {
  key: 'finance',
  name: '金融',
  moive: [{
    url: 'http://www.w3schools.com/html/mov_bbb.mp4'
  }]
  }, {
  key: 'acre',
  name: '地产',
  moive: [{
    url: 'http://www.w3schools.com/html/mov_bbb.mp4'
  }]
  }]
const Avatar: React.FC = () => {
  const [type, setType] = useState<any>('edu')
  const [moives, setMoives] = useState<any>(BtMap[0].moive)
  const switchTab = (type: string) => {
    setType(type);
    setMoives((BtMap as any).find((item: { key: string; }) => item.key === type).moive)
  }
  return (
    <div>
    <NavBar />
      <div className={styles.container}>
        <div className={styles.avatar}>
          选择Avatar
        </div>
        <p className={styles.des}>文字描述</p>
        <div className={styles.bts}>
          {
            BtMap.map(b => {
              return (
                <Button type='primary'
                  className={
                    type === b.key ? '' : styles.active
                  } 
                  onClick={() => switchTab(b.key)}>
                  {b.name}
                </Button>
              )
            })
          }
        </div>
        <div className={styles.moives}>
          {
            moives.map((m: { url: string | undefined; }) => {
              return (
                <video src={m.url} controls></video>
              )
            })
          }
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default Avatar