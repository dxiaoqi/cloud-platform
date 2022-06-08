import React, { useState, useEffect } from 'react'
import NavBar from '../../component/navbar/index';
import Footer from '../../component/footer';
import { Button, Row, Col, Spin, Image as PImage, Upload, message, Select } from 'antd'
import Search from "antd/lib/input/Search";
import { fileByBase64, fileByformdata } from '../../util';
import { TOKEN_TAG } from '../../constant';
import { ProductExperience } from "../../types";
import { genImg, } from "../../api";
import { upCheck, videoSubmit, check } from '../../api/video'
import avatarList from "../../assert/avatar";
import audioList from "../../assert/mpThree";
import styles from './index.module.scss'
const { Option } = Select;

const audioMap = ['kanghui', 'obama', 'titor']
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
const imgList = [
  {
    id: '001',
    key: '001',
    url: 'http://www.w3schools.com/html/mov_bbb.mp4'
  }, {
    id: '002',
    key: '002',
    url: 'http://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    id: '003',
    key: '003',
    url: 'http://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    id: '004',
    key: '004',
    url: 'http://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    id: '005',
    key: '005',
    url: 'http://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    id: '006',
    key: '006',
    url: 'http://www.w3schools.com/html/mov_bbb.mp4'
  }
]
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
  let [req, setReq] = useState<any>({});
  const [resImg, setResImg] = useState<string>('');
  const [audioSrc, setaudioSrc] = useState<string>('');
  const [aid, setaid] = useState<string>('');
  const [img, setImg] = useState<string>('');
  let [srcObject, setsrcObject] = useState<string>('');
  const [type, setType] = useState<any>('edu')
  const [moives, setMoives] = useState<any>(BtMap[0].moive)
  const [imgId, setImgId] = useState<any>(imgList[0].id)
  const [selectImg, setSelect] = useState<number | null>(0);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductExperience>();


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
  const upload = (e: any) => {
    const appID = localStorage.getItem("appID") || "123456";
    const auth = sessionStorage.getItem(TOKEN_TAG);
    console.log('auth', auth)
    if (!appID) {
      message.error("请先申请appID");
      return
    }
    if (!auth) {
      message.error("请先登录");
      return
    }
    product ?.url && (req.img || req.url) && genImg(product ?.url, {
      appId: appID,
      ...req,
      img: req.img ?.split(',')[1]
  }, {
      headers: { 'Authorization': "Basic " + sessionStorage.getItem(TOKEN_TAG) }
    }).then((res: any) => {
      setSpinning(false);
      if (res.data.code === 200) {
        setResImg(res.data.data.img)
      } else {
        message.error('生成失败，失败原因：' + res.data.msg);
      }
    }).catch((err: any) => {
      message.error('请求失败');
      setSpinning(true);
    })
};

  const selectHairImg = (img: string) => {
    // base 64
    req.img = img;
    //   setImg(img);
    setReq(Object.assign({}, req));
  }
  const props = {
    beforeUpload: (file: any) => {
      fileByBase64(file, e => {
        //没有选择
        setImg(e as string);
        setResImg(e as string);
        setSelect(null);
        selectHairImg((e as string));
      })
      return false;
    }
  };

  const mpprops = {
    accept: '.mp3',
    beforeUpload: (file: any) => {
      console.log('file1', file)
      const isAudio = file.type === 'audio/mpeg';
      if (!isAudio) {
        message.error(`${file.name} 不是一个音频文件`);
      }

      const param = new FormData()
      param.append('file', file)
      upCheck('/video/upload/check',
        param,
        {
          headers: { 'Token': sessionStorage.getItem(TOKEN_TAG) }
        }
      ).then((res: any) => {
        if (res.data && res.data.code === 200) {
          setaid(res.data.data)
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

  const preview = (id: string) => {
    setResImg((avatarList as any)[id]);
    setImgId(id)
    // 把image 转换为 canvas对象  
    let canvas: any | null = document.getElementById('origin_canvas')
    // 获取canvas的上下文信息
    let ctx = canvas.getContext('2d')
    // 新建Image对象
    let image = new Image()
    image.src = (avatarList as any)[id]
    image.onload = function () {
      // 设置canvas的宽和高
      canvas.width = image.width
      canvas.height = image.height
      // 将图片绘制到canvas上
      ctx.drawImage(image, 0, 0, image.width, image.height)

      // 获取50,50 到 200,200矩形区域的base64信息
      let base64Info = getImageBase64Data()
      setImg(base64Info)
    }
    function getImageBase64Data() {
      let cropImgInfo = ctx.getImageData(0, 0, canvas.width, canvas.height);
      // 反转颜色)
      let newCanvas = document.createElement('canvas')
      newCanvas.width = image.width
      newCanvas.height = image.height
      let newCtx: any | null = newCanvas.getContext('2d')
      newCtx.putImageData(cropImgInfo, 0, 0)
      return newCanvas.toDataURL()
    }

  }
  const setImage = (value: string) => {
    // 设置url
    if (value) {
      req.url = value;
      req.img = '';
      setImg(value);
      setResImg(value);
      setReq(Object.assign({}, req));
    }
    upload(0);
  }
  const onChange = (value: string, option: any) => {
    // console.log('valye',option)
    setaid(option.key)
    setaudioSrc(value)
  }


  // 提交视频 
  const videoSub = () => {

    setSpinning(true);
    const Token = sessionStorage.getItem(TOKEN_TAG)
    const appID = localStorage.getItem("appID")
    if (Token === 'null') {
      message.error('请先登录')
      setSpinning(false)
    } else if (appID === 'null') {
      message.error('请移步到控制台页，应用信息生成appID')
      setSpinning(false)
    } else {
      const data = {
        appId: localStorage.getItem("appID"),
        aid: aid,
        mid: '796100172',
        img: img ?.split(';')[1].split(',')[1]
    }
      videoSubmit('/video/submit',
        data,
        {
          headers: { 'Token': sessionStorage.getItem(TOKEN_TAG) }
        }
      ).then((res: any) => {
        if (res.data && res.data.code === 200) {
          const { requestId } = res.data.data
          sessionStorage.setItem('requestId', requestId)
          check('/video/check', { requestId },
            {
              headers: { 'Token': sessionStorage.getItem(TOKEN_TAG) }
            }).then((res: any) => {
              if (res.data && res.data.code === 200) {
                message.success('生成成功，请前往我的视频即可查看')
              } else {
                message.warn('生成中' + res.data.msg)
              }
              setSpinning(false)
            }).catch((rej: any) => {
              message.error('请求失败')

              setSpinning(false)
            })
        } else {
          message.error('视频生成失败，失败原因是：' + res.data.msg)
        }

        setSpinning(false)
      }).catch((rej: any) => {

        setSpinning(false)
        message.error('请求失败')
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
              {/* <Col span={7}>
              <Row>
                <Col span={3}>01</Col>
                <Col span={21}>
                  <p>SELECT VIDEO TEMPLATE</p>
                  <p>
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
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={22} style={{ height: '320px', overflow: 'auto' }}>
                  {
                    imgList.map((item: any) => {
                      return (<PImage preview={false} key={item.id} src="error" className={item.id === imgId ? styles.preview_cur : styles.preview}
                        fallback="data:image/png;base64,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"
                        width={120} height={120} onClick={() => preview(item.id)} />)

                    })
                  }

                </Col>
              </Row>

            </Col>
            */}
              {/* 02 */}
              <Col span={10}>
                <Row>
                  <Col span={3}>01</Col>
                  <Col span={21}>
                    <p>SELECT AVATAR</p>
                  </Col>
                </Row>
                <Row justify='center'>
                  <Col span={24} className={styles.product_body_img}>
                    <PImage preview={false} src={resImg}
                      fallback="data:image/png;base64,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"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={24} style={{ height: '145px', overflow: 'auto', display: 'flex' }}>
                    {
                      Object.keys(avatarList).map((s, i) => {
                        return (
                          <PImage preview={false} key={s} src={(avatarList as any)[s]} className={s === imgId ? styles.preview_cur : styles.preview}
                            width={120} height={120} onClick={() => preview(s)} />

                        )
                      })
                    }

                  </Col>
                </Row>
                <Row>
                  <Col span={22}>
                    <div className={styles.upload}>
                      <Upload {...props}>
                        <Button type='primary' >本地上传</Button>
                      </Upload>
                      <Search
                        className={styles.search}
                        placeholder="输入图片地址"
                        enterButton="测试"
                        size="middle"
                        onSearch={e => setImage(e)}
                      />

                    </div>


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
                  <Col span={11}>
                    <Select
                      placeholder="选择音频"
                      optionFilterProp="children"
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
                  <Col span={11} className={styles.mpthree} >
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