import React, { useState, useEffect } from 'react'
import NavBar from '../../component/navbar/index';
import Footer from '../../component/footer';
import { Button, Modal, message, Space, Table, Tag, Pagination , } from 'antd'
import { videoList } from '../../api/video'
import { TOKEN_TAG } from '../../constant';
import styles from './index.module.scss';
import type { ColumnsType } from 'antd/lib/table';
import type { PaginationProps } from 'antd';
import moment from 'moment'

interface DataType {
  key: string;
  name: string;
  age: number;
  url: string;
  tags: string;
}


const BtMap = [{
  key: 'woman',
  name: '女性角色声音',
  moive: [{
    text: '中国',
    url: 'http://www.w3schools.com/html/mov_bbb.mp4'
  }, {
    text: '中国',
    url: 'http://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    text: '中国',
    url: 'http://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    text: '中国',
    url: 'http://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    text: '中国',
    url: 'http://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    text: '中国',
    url: 'http://www.w3schools.com/html/mov_bbb.mp4'
  }]
}, {
  key: 'man',
  name: '女性角色声音',
  moive: [{
    text: '中国',
    url: 'http://www.w3schools.com/html/mov_bbb.mp4'
  }]
}]
const VideoPlayer: React.FC = () => {
  const [type, setType] = useState<any>('woman')
  const [moives, setMoives] = useState<any>([])
  const [playUrl, setplayUrl] = useState<any>('http://www.w3schools.com/html/mov_bbb.mp4')
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showMoive, setShowMoives] = useState<{ text: string | undefined; url: string | undefined } | null>(null);
  const columns: ColumnsType<DataType> = [
    {
      title: '音频名称',
      dataIndex: 'name',
      key: 'name',
      align:'center',
      width: 430
      // render: text => <a>{text}</a>,
    },
    {
      title: '时间',
      dataIndex: 'createTime',
      key: 'createTime',
      align:'center',
       width: 330,
      // render: (_, record) => (
      //   <>
      //   {moment(new Date).format('YYYY-MM-DD HH:mm:ss')}
      //   </>
      // )
    },
   
    {
      title: '状态',
      key: 'tags',
      align:'center',
      dataIndex: 'tags',
      width: 120,
      render: (_, { tags }) => (
        <>
          
              <Tag color='green' >
               完成
              </Tag>
         
        </>
      ),
    },
    {
      title: '操作',
      key: 'action',
      align:'center',
      width: 240,
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => {
            setplayUrl(record.url)
            setIsModalVisible(true)
          }}>播放</a>
          <a
            onClick={() => { return false }}
            style={{ cursor: 'default', color: '#ccc' }}
          >删除</a>
        </Space>
      ),
    },
  ];
  // 改变当前页大小
  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current:number, pageSize:number) => {
    console.log(current, pageSize);
  };
  
    // 获取视频列表
  useEffect(() => {
    const appID = localStorage.getItem("appID") || "123456";
    const auth = sessionStorage.getItem(TOKEN_TAG);
    if (!auth) {
      message.error("请先登录");
      return
    }
    if (appID === 'null') {
      message.error("请先申请appID");
      return
    }
    videoList('/video/list',
      {
        appId: appID
      },
      {
        headers: { 'Token': auth }
      }).then((res: any) => {
        if (res.data && res.data.code === 200) {
          const  templist = []
          for(let key in res.data.data){          
            const urlList = res.data.data[key]?.split('/')
            templist.push({key:key,url:res.data.data[key],name: urlList[urlList.length-1],createTime:moment(new Date).format('YYYY-MM-DD HH:mm:ss')})
          }
         
          setMoives(templist)
        
        } else {
          message.warn('我的视频资源查询失败，失败原因：' + res.data.msg)
        }
      }).catch((rej: any) => {

        console.log('res', rej)
        // message.error('请求失败')
      })
  }, [])

  return (
    <div>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.avatar}>
          我的视频
        </div>
        <Table columns={columns} dataSource={moives}  size='small'/>
        {/* <div className={styles.selectVideo}>
          {
            moives.map((item: any) => {
              console.log('item',item)
              return (
                <div className={styles.single} onClick={()=>{
                  setplayUrl(item)
                }}>
                  <video src={item} controls height={135}></video>
                </div>
              )
            })
        }
        </div>
        <div className={styles.playerVideo}>
          <video src={playUrl} controls></video>
        </div> */}
      </div>
      <Modal className={styles.modal} title='视频播放' visible={isModalVisible} footer={null} onCancel={() => { 
        
        let myVid:any | null = document.getElementById("playVideo");
        myVid.pause()
        setIsModalVisible(false)
         }}>
        <video id="playVideo" className={styles.video} src={playUrl} controls ></video>
      </Modal>
      <div style={{ height: '100px' }}></div>
      <Footer />
    </div>
  )
}
export default VideoPlayer