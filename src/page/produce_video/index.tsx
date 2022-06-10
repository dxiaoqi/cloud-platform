import React, { useState, useEffect } from 'react'
import NavBar from '../../component/navbar/index';
import Footer from '../../component/footer';
import { Button, Row, Col, Spin, Image as PImage, Upload, message, Select } from 'antd'
import Search from "antd/lib/input/Search";
import { fileByBase64, fileByformdata } from '../../util';
import { TOKEN_TAG } from '../../constant';
import { ProductExperience } from "../../types";
import { genImg, } from "../../api";
import { upCheck, videoSubmit, check, genVoice, genVideo, userList, voiceList } from '../../api/video'
import avatarList from "../../assert/avatar";
import audioList from "../../assert/mpThree";
import styles from './index.module.scss'
const { Option } = Select;


function getObjectURL(file: any) {
  var url = null;
  if (URL.createObjectURL != undefined) { // basic  
    url = URL.createObjectURL(file);
  } else if (window.URL != undefined) { // mozilla(firefox)  
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL != undefined) { // webkit or chrome  
    url = window.webkitURL.createObjectURL(file);
  }
  return url;
}
const ProductVideo: React.FC = () => {

  const [videoId, setVideoId] = useState<string>(''); // 视频id
  const [audioSrc, setaudioSrc] = useState<string>('');
  const [VoiceId, setVoiceId] = useState<string>('');//音频id
  const [imgList, setImgList] = useState<any>([])
  const [imgId, setImgId] = useState<any>('')
  const [imgSrc, setImgSrc] = useState<any>('')
  const [selectAudio, setSelectAudio] = useState<any>([]);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [pubAd, setPubAd] = useState<any>('选择音频');
  const [preAd, setPreAd] = useState<any>('自定义音频');

  useEffect(() => {
    const appID = sessionStorage.getItem("appID");
    const auth = sessionStorage.getItem(TOKEN_TAG);
    if(!auth){
      message.error('请先登录')
      return
    }
    if (!appID) {
      message.error("请先申请appID");
      return
    }
    // 自定义音频库
    voiceList('/voiceList',
      {
        appId: appID
      },
      {
        headers: { 'Token': auth }
      }).then((res: any) => {
        if (res.data && res.data.code === 200) {
          console.log('data', res.data.data)
          setSelectAudio(res.data.data)
        } else {
          message.warn('自定义音频资源查询失败，失败原因：' + res.data.msg)
        }
        setSpinning(false);
      }).catch((rej: any) => {
        message.error('请求失败')
        setSpinning(false);
      })
   
   // 用户图片
    userList('/userList ', {
      appId: appID
    },
      {
        headers: { 'Authorization': "Basic " + sessionStorage.getItem(TOKEN_TAG) }
      }).then((res: any) => {
        if (res.data && res.data.code === 200) {
          setImgList(res.data.data)
        }
      }).catch((rej: any) => {
        console.log('rej', rej)

      })
  }, [])
  // 获取音频时间
  function getTime() {
    setTimeout(function () {
      const audioP: any | null = document.getElementById("audioP")
      var duration = audioP.duration || 0;
      if (isNaN(duration)) {
        getTime();
      }
      else {
        console.info("该歌曲的总时间为：" + duration + "秒")
      }
    }, 10);
  }



  const mpprops = {
    accept: '.mp3',
    beforeUpload: (file: any) => {
      const isAudio = file.type === 'audio/mpeg';
      if (!isAudio) {
        message.error(`${file.name} 不是一个音频文件`);
      }
      // const appID: string | null = JSON.parse(localStorage.getItem('appID'))
      let appID: string | null = sessionStorage.getItem("appID");
      if (appID === null) {
        message.error('请移步到控制台页，应用信息生成appID')
      } else {
        appID = appID.toString()
      }
      file.appId = appID
      const param = new FormData()
      param.append('audio_input', file)
      param.append('voice_name', file.name)
      param.append('appId', file.appId)
      genVoice('/genVoice',
        param,
        {
          headers: { 'Token': sessionStorage.getItem(TOKEN_TAG) }
        }
      ).then((res: any) => {
        if (res.data && res.data.code === 200) {
          setVoiceId(res.data.data)
        } else {
          message.warn('本地上传音频失败，失败原因：' + res.data.msg)
        }
      }).catch((rej: any) => {
        message.error('请求失败')
      })
      var objUrl = getObjectURL(file);
      const audioP: any | null = document.getElementById("audioP")
      audioP.src = objUrl
      getTime();
      return isAudio || Upload.LIST_IGNORE;
    },

  };

  const preview = (item: any) => {
    setVideoId(item.userId)
    setImgId(item.userId)
    setImgSrc(item.url)
  }

  const onChange = (value: string, option: any) => {
    console.log('option', option)
    setPreAd('自定义音频')
    setPubAd(value)
    setaudioSrc(value)
    setVoiceId(option.key)
  }
  const onChangePerfer = (value: string, option: any) => {

    setVoiceId(value)
    setaudioSrc(option.url)
    setPreAd(value)
    setPubAd('选择音频')
  }

  // 提交视频 
  const videoSub = () => {
    setSpinning(true);
    const Token = sessionStorage.getItem(TOKEN_TAG)
    const appID = sessionStorage.getItem("appID")
    if (Token === 'null') {
      message.error('请先登录')
      setSpinning(false)
    } else if (appID === 'null') {
      message.error('请移步到控制台页，应用信息生成appID')
      setSpinning(false)
    } else {
      const data = {
        appId: sessionStorage.getItem("appID"),
        VoiceId,// 音频id
        videoId, // 视频id
      }
      genVideo('/genVideo',
        data,
        {
          headers: { 'Token': sessionStorage.getItem(TOKEN_TAG) }
        }
      ).then((res: any) => {
        if (res.data && res.data.code === 200) {
          message.success('生成成功，请移步到我的资源下我的视频浏览')
        } else {
          message.warn('生成失败，失败原因是：' + res.data.msg)
        }
        setSpinning(false)
      }).catch((rej: any) => {
        message.error('请求失败')

        setSpinning(false)
      })
    }
  }


  return (
    <div>
      <NavBar />
      <Spin spinning={spinning} tip="视频生成中，请稍后...">
        <div className={styles.container}>
          <div className={styles.des}>
            免费创造AI视频
        </div>
          <p className={styles.avatar}>请选择一款模板以及您喜爱的角色</p>
          <p className={styles.avatar}>编辑文字后点击生成，即可见到令人眼前一亮的效果</p>
          <div className={styles.product_body}>
            {/* 条件选择 */}
            <Row justify="space-between">
              {/* 01 */}
              {/* <Col span={12}>
                <Row>
                  <Col span={3}>01</Col>
                  <Col span={21}>
                    <p>SELECT VIDEO TEMPLATE</p>

                  </Col>
                </Row>
                <Row>
                  <Col span={6} style={{ height: '320px',width:'120px',overflow: 'auto' }}>
                    {
                      imgList.map((item: any) => {
                        return (<PImage preview={false} key={item.userId} className={item.userId === imgId ? styles.preview_cur : styles.preview}
                          src={item.url}
                          width={110} height={120}
                          onClick={() => preview(item)}
                        />)

                      })
                    }

                  </Col>
                  <Col span={14} style={{ height: '320px' }}>
                    <PImage preview={false}
                      src={imgSrc}
                      width={280} height={300}
                    />
                  </Col>

                </Row>
              </Col>
             */}
              {/* 01 */}
              <Col span={12}>
                <Row>
                  <Col span={3}>01</Col>
                  <Col span={21}>
                    <p>SELECT AVATAR</p>
                  </Col>
                </Row>
                <Row justify='center'>
                  <Col span={24} className={styles.product_body_img}>
                    <PImage preview={false} src={imgSrc}
                      fallback="data:image/png;base64,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"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={24} style={{ height: '145px', overflow: 'auto', display: 'flex' }}>
                  {
                      imgList.map((item: any) => {
                        return (<PImage preview={false} key={item.userId} className={item.userId === imgId ? styles.preview_cur : styles.preview}
                          src={item.url}
                          width={110} height={120}
                          onClick={() => preview(item)}
                        />)

                      })
                    }
                  </Col>
                </Row>
              </Col>
           
              {/* 03 */}
              <Col span={10}>
                <Row>
                  <Col span={3}>02</Col>
                  <Col span={21}>
                    <p>SELECT YOUR ADIEO </p>
                  </Col>
                </Row>
                <Row>
                  <Col span={22}>
                    <audio id='audioP' controls src={audioSrc}>

                    </audio>

                  </Col>
                </Row>

                <Row justify='space-evenly' className={styles.audio_container}>
                  <Col span={8} >
                    音频模板：
                </Col>
                  <Col span={16}>

                    <Select
                      placeholder="选择音频"
                      optionFilterProp="children"
                      value={pubAd}
                      onChange={onChange}
                      style={{ width: '150px' }}
                      filterOption={(input, option) =>
                        (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                      }
                    >
                      {
                        audioList.map((s, i) => {
                          return (
                            <Option value={s.value} key={s.key} >{s.label}</Option>
                          )
                        })
                      }


                    </Select>
                  </Col>
                </Row>

                <Row justify='space-evenly' className={styles.audio_container}>
                  <Col span={8}>
                    自定义音频资源：
                </Col>
                  <Col span={16}>
                    <Select
                      placeholder="自定义音频"
                      optionFilterProp="children"
                      value={preAd}
                      onChange={onChangePerfer}
                      style={{ width: '150px' }}
                      filterOption={(input, option) =>
                        (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                      }
                    >
                      {
                        selectAudio.map((s: any) => {
                          return (
                            <Option value={s.guid} key={s.guid} url={s.url}>{s.name}</Option>
                          )
                        })
                      }


                    </Select>
                  </Col>
                </Row>
                <Row justify='space-evenly' className={styles.audio_container}>
                  <Col span={8}>
                    上传本地音频：
                </Col>
                  <Col span={16} className={styles.mpthree} >
                    <Upload {...mpprops} maxCount={1}>
                      <Button type='primary'>本地上传(仅可上传1份)</Button>
                    </Upload>
                  </Col>
                </Row>
              </Col>
            </Row>
            {/* 创造视频  */}
            <Row justify="space-between">
              <Col span={24} style={{ textAlign: 'center', margin: '20px  0' }}>
                <Button type="primary" style={{ width: '200px' }} onClick={videoSub}>创造视频</Button>
              </Col>
            </Row>
          </div>


        </div>

      </Spin>
      <canvas id="origin_canvas" style={{ display: 'none' }}></canvas>
      {/* <Footer /> */}
    </div>
  )
}
export default ProductVideo