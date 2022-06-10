import React, { useState, useEffect } from 'react'
import { Button, Modal, message, Space, Table, Tag, Spin } from 'antd'
import { videoList, userList, deleteVoice } from '../../api/video'
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
const VideoList: React.FC = () => {
  const [spinning, setSpinning] = useState<boolean>(false);
  const [moives, setMoives] = useState<any>([])
  const [playUrl, setplayUrl] = useState<any>('')
  const [isModalVisible, setIsModalVisible] = useState(false);const columns: ColumnsType<DataType> = [
    {
      title: 'guid',
      dataIndex: 'guid',
      key: 'guid',
      align: 'center',
      width: 200
    },
    {
      title: '视频名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      width: 230
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      align: 'center',
      width: 330,
      render: (time) => (
        <>
          {moment(time).format('YYYY-MM-DD HH:mm:ss')}
        </>
      )
    },

    {
      title: '状态',
      key: 'status',
      align: 'center',
      dataIndex: 'status',
      width: 120,
      render: (status) => (
        <>

          <Tag color='green' >
            {status}
          </Tag>

        </>
      ),
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
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

  // 获取视频列表
  useEffect(() => {
    
    updateStatus()
    
  }, [])
  const updateStatus = () => {
    const appID = sessionStorage.getItem("appID") || "123456";
    const auth = sessionStorage.getItem(TOKEN_TAG);
    if (!auth) {
      message.error("请先登录");
      return
    }

    if (appID === null) {
      message.error("请先申请appID");
      return
    }
    
    setSpinning(true);
    userList('/videoList',
      {
        appId: appID
      },
      {
        headers: { 'Token': auth }
      }).then((res: any) => {
        if (res.data && res.data.code === 200) {
          for(let i=0;i<res.data.data.length;i++){
            res.data.data[i].key= res.data.data[i].guid
          }
          setMoives(res.data.data)
          console.log('res', res.data.data)
          // const  templist = []
          // for(let key in res.data.data){          
          //   const urlList = res.data.data[key]?.split('/')
          //   templist.push({key:key,url:res.data.data[key],name: urlList[urlList.length-1],createTime:moment(new Date).format('YYYY-MM-DD HH:mm:ss')})
          // }

          // setMoives(templist)

        } else {
          message.warn('我的视频资源查询失败，失败原因：' + res.data.msg)
        }

        setSpinning(false)
      }).catch((rej: any) => {
        setSpinning(false)
        message.error('请求失败')
      })
  }
  return (
    <div>

      <Spin spinning={spinning} tip="我的视频资源加载中，请稍后...">
        <div className={styles.container}>
          <div className="table-operation">
            <span>如有生成中的视频，请1分钟后点击更新状态</span>
            <Button type='primary' onClick={() => {
              updateStatus()
            }} >更新状态</Button>
          </div>
          <Table columns={columns} dataSource={moives} size='small' />
        </div>
      </Spin>
      <Modal className={styles.modal} title='视频播放' visible={isModalVisible} footer={null} onCancel={() => {

        let myVid: any | null = document.getElementById("playVideo");
        myVid.pause()
        setIsModalVisible(false)
      }}>
        <video id="playVideo" className={styles.video} src={playUrl} controls ></video>
      </Modal>
      <div style={{ height: '100px' }}></div>
    </div>
  )
}
export default VideoList