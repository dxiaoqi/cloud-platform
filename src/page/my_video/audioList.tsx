import React, { useState, useEffect } from 'react'
import { Spin, Modal, message, Space, Table, Tag,Button } from 'antd'
import { voiceList, deleteVoice } from '../../api/video'
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



const AudioList: React.FC = () => {
  const [spinning, setSpinning] = useState<boolean>(false);
  const [moives, setMoives] = useState<any>([])
  const [playUrl, setplayUrl] = useState<any>('http://www.w3schools.com/html/mov_bbb.mp4')
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showMoive, setShowMoives] = useState<{ text: string | undefined; url: string | undefined } | null>(null);
  const columns: ColumnsType<DataType> = [
    {
      title: 'guid',
      dataIndex: 'guid',
      key: 'guid',
      align: 'center',
      width: 200
      // render: text => <a>{text}</a>,
    },
    {
      title: '音频名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      width: 230
      // render: text => <a>{text}</a>,
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
      render: (value) => (
        <>

          <Tag color='green' >
            {value}
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
            onClick={() => { delSingle(record) }}

          >删除</a>
        </Space>
      ),
    },
  ];
  // 删除
  const delSingle = (record: any) => {
    const appID = sessionStorage.getItem("appID");
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
    deleteVoice('/deleteVoice', {
      appId: appID,
      voiceId: record.guid
    }, {
      headers: { 'Token': auth }
    }).then((res: any) => {
      if (res.data && res.data.code === 200) {
        message.success('删除成功')
        updateStatus()
      }
      setSpinning(false);
      console.log('res', res)
    }).catch((rej: any) => {
      console.log('rej', rej)

      message.error('请求异常')
      setSpinning(false);
    })
  }
  
  const updateStatus = () =>{
    const appID = sessionStorage.getItem("appID") || "123456";
    const auth = sessionStorage.getItem(TOKEN_TAG);
    // if (!auth) {
    //   message.error("请先登录");
    //   return
    // }

    if (appID === null) {
      message.error("请先申请appID");
      return
    }
    
    setSpinning(true);
    voiceList('/voiceList',
      {
        appId: appID
      },
      {
        headers: { 'Token': auth }
      }).then((res: any) => {
        if (res.data && res.data.code === 200) {
          const templist = []
          for (let i = 0; i < res.data.data.length; i++) {
            templist.push({ key: res.data.data[i].guid, ...res.data.data[i] })
          }
          setMoives(templist)
        } else {
          message.warn('我的音频资源查询失败，失败原因：' + res.data.msg)
        }
        setSpinning(false);
      }).catch((rej: any) => {
        message.error('请求失败')
        setSpinning(false);
      })
  }
  // 获取视频列表
  useEffect(() => {

    const appID = sessionStorage.getItem("appID") || "123456";
    const auth = sessionStorage.getItem(TOKEN_TAG);
    // if (!auth) {
    //   message.error("请先登录");
    //   return
    // }

    if (appID === null) {
      message.error("请先申请appID");
      return
    }
    
    setSpinning(true);
    voiceList('/voiceList',
      {
        appId: appID
      },
      {
        headers: { 'Token': auth }
      }).then((res: any) => {
        if (res.data && res.data.code === 200) {
          const templist = []
          for (let i = 0; i < res.data.data.length; i++) {
            templist.push({ key: res.data.data[i].guid, ...res.data.data[i] })
          }
          setMoives(templist)
        } else {
          message.warn('我的音频资源查询失败，失败原因：' + res.data.msg)
        }
        setSpinning(false);
      }).catch((rej: any) => {
        message.error('请求失败')
        setSpinning(false);
      })
  }, [])

  return (
    <div>

      <Spin spinning={spinning} tip="我的音频资源加载中，请稍后...">
        <div className={styles.container}>
          <div className="table-operation">
          <span>如有生成中的音频，请1分钟后点击更新状态</span> 
          <Button type='primary' onClick={()=>{
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
        <audio id="playVideo" className={styles.video} src={playUrl} controls ></audio>
      </Modal>
      <div style={{ height: '100px' }}></div>
    </div>
  )
}
export default AudioList