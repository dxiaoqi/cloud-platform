import React, { useEffect, useState } from "react";
import { Button, Image, Upload, Collapse, Spin, Segmented, Select } from 'antd';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { TOKEN_TAG } from '../../constant';
import NavBar from "../../component/navbar";
import Footer from "../../component/footer";
import { download, fileByBase64, toDataURL } from '../../util';
import hairstyle from "../../assert/hairstyle";
import { hairColor } from "../../constant";
import cx from 'classnames';
import styles from "./index.module.scss";
import Search from "antd/lib/input/Search";
import { genImg, getProductExperience } from "../../api";
import { ProductExperience } from "../../types";
import { message } from 'antd';
const { Panel } = Collapse;

const ProductPage: React.FC = () => {
  let [req, setReq] = useState<any>({});
  const [img, setImg] = useState<string>('');
  const [resImg, setResImg] = useState<string>('');
  const [productList, setProductList] = useState<ProductExperience[]>([]);
  const [product, setProduct] = useState<ProductExperience>();
  const [selectImg, setSelect] = useState<number | null>(0);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [testUrl, setTestUrl] = useState<string[]>(['']);

  const upload  = (e: any) => {
    const appID = localStorage.getItem("appID") || "123456";
    const auth = localStorage.getItem(TOKEN_TAG);
    if (!appID) {
      message.error("请先申请appID");
      return
    }
    if (!auth) {
      message.error("请先登录");
      return
    }
    setSpinning(true);
    product?.url && (req.img || req.url) && genImg(product?.url, {
      appId: appID,
      ...req,
      img: req.img?.split(',')[1]
    }).then(res => {
      setSpinning(false);
      if (res.data.code === 200) {
        setResImg(res.data.data.img)
      } else {
        message.error('请求失败');
      }
    }).catch(err => {
      message.error('请求失败');
      setSpinning(true);
    })
  };

  useEffect(() => {
    getProductExperience().then(res => {
      // 获取列表，加载地址张
      const t = res[0].testUrls?.map((u: string) => 'data:image/jpge;base64,' + u);
      setProductList(res);
      setProduct(res[0]);

      // 初始默认属性
      reset(res[0]);
      // 预览
      setTestUrl(t)
      selectPrefab(0, res[0]);
      setResImg(t[0]);
    })
  }, [])

  const reset = (product: ProductExperience) => {
    const { reqDes } = product;
    req = {}
    Object.keys(JSON.parse(reqDes)).forEach(key => {
      if (key === 'hairstyle') {
        // 如果是hairstyle，选第一个
        selectHairStyle("2f7c9ea82062e7c3cffccbdab121431d");
      }
      if (['haircolor1', 'haircolor2'].includes(key)) {
        // 如果是haircolor，选第一个
        selectHairColor('HDR01_885555', key);
      }
      if (key === 'label') {
        req.label = 0;
        setReq(Object.assign({}, req));
      }
      if (key === 'type') {
        req.type = 0;
        setReq(Object.assign({}, req));
      }
    })
  }

  const selectHairImg = (img: string) => {
    // base 64
    req.img = img;
 //   setImg(img);
    setReq(Object.assign({}, req));
  }
  const props = {
    beforeUpload: (file : any) => {
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

  const selectPrefab = (id: number, p: ProductExperience) => {
    // 设置Index，img
    const t = p?.testUrls?.map(u => 'data:image/jpge;base64,' + u);
    setSelect(id);
    t && setImg(t[id]);
    t && selectHairImg(t[id]);
    // toDataURL(testUrl[id], e => {
    //   selectHairImg(e);
    // })
  }
  const onCollapseChange = (key: string | string[]) => {
    console.log(key);
  }
  const setTabs = (value: string | number) => {
    let pos = 0;
    setProduct(productList.find((e, index) => {
      if (e.title === value) {
        pos = index;
        return true;
      }
    }));
    // 需要重置一波
    reset(productList[pos]);
    const t = productList[pos].testUrls?.map(u => 'data:image/jpge;base64,' + u) || [];
    selectPrefab(0, productList[pos]);
    setResImg(t[0]);
    setTestUrl(t)
  }
  const selectHairColor = (color: string, type: string) => {
    // 设置颜色
    req[type] = color;
    setReq(Object.assign({}, req));
  }
  const selectHairStyle = (value: string) => {
    // 设置发行
    req.hairstyle = value;
    setReq(Object.assign({}, req));
  }

  const setImage = (value: string) => {
    // 设置url
    if(value) {
      req.url = value;
      req.img = '';
      setImg(value);
      setResImg(value);
      setReq(Object.assign({}, req));
    }
    upload(0);
  }
  const renderProto = (): any => {
    // 选择后条件，有一个默认的
    return product && Object.keys(JSON.parse(product.reqDes)).map(e => {
      if (['appid', 'img'].includes(e)) {
        return (<></>);
      }
      if (e === 'hairstyle') {
        return (
          <div className={styles.testimg}>
            {
              Object.keys(hairstyle).map((s, i) => {
                return (
                  <div
                    key={`a${s}`}
                    onClick={() => { selectHairStyle(s) }}
                    className={cx(styles.setting_item, req.hairstyle === s ? styles.active : '')}>
                    <Image preview={false} src={(hairstyle as any)[s]} width={120} height={120} />
                  </div>
                )
              })
            }
          </div>
        )
      }
      if (e === 'haircolor2' || e === 'haircolor1') {
        return (
          <div className={styles.hairColor}>
            <p>{e === 'haircolor2' ? '颜色1' : '颜色2'} :</p>
            {Object.keys(hairColor).map(c => <span onClick={() => {
              selectHairColor(c, e)
            }}
            key={`${e}-${c}`}
            className={cx(styles.haircolor, req[e] === c ? styles.active : '')}
            style={{
              backgroundColor: (hairColor as any)[c],
            }}></span>)}
          </div>
        )
      }
      if (e === 'type') {
        return (
          <div className={styles.hairType}>
            <span>颜色类型 ： </span>
            <Select style={{ width: 100}} value={req.type} onChange={(val) => {
              req.type = val;
              console.log('type', val)
              setReq(Object.assign({}, req));
            }}>
              <Select.Option value={0}>纯色</Select.Option>
              <Select.Option value={1}>双拼色</Select.Option>
              <Select.Option value={2}>渐变色</Select.Option>
            </Select>
          </div>
        )
      }
      if (e === 'label' && req.type === 2) {

        return (
          <div className={styles.hairType}>
            <span>渐变类型 ： </span>
            <Select style={{ width: 100}} value={req.label} onChange={val => {
              req.label = val;
              setReq(Object.assign({}, req));
            }}>
              <Select.Option value={0}>横向</Select.Option>
              <Select.Option value={1}>纵向</Select.Option>
            </Select>
          </div>
        )
      }
      return null;
    })
  }

  const renderType = () => {

  }
  return (
    <div className={styles.page_container}>
      <NavBar />
      <div className={styles.product__container}>
        <div className={styles.title}>
          <p>产品</p>
        </div>
        <div className={styles.panel}>
        <Segmented className={styles.seg} options={productList.map(e => e.title)} value={product?.title} onChange={setTabs}/>
          <p>产品体验 {product?.title}</p>
          <div className={styles.panel_content}>
            <div className={styles.panel_content_item}>
              <div className={styles.panel_content_left}>
                <div className={styles.panel_content_item_img}>
                  <Spin
                    spinning={spinning}
                    tip="生成中">
                    <ReactCompareSlider
                      className={styles.img_slider}
                      itemOne={<ReactCompareSliderImage src={img} srcSet={img} alt="Image one" />}
                      itemTwo={<ReactCompareSliderImage src={resImg} srcSet={resImg} alt="Image two" />}
                    />
                  </Spin>
                </div>
                <div className={styles.upload}>
                  <Upload {...props}>
                    <Button type='primary'>本地上传</Button>
                  </Upload>
                  <Search
                    className={styles.search}
                    placeholder="输入图片地址"
                    enterButton="测试"
                    size="middle"
                    onSearch={e => setImage(e)}
                  />
                  <Button onClick={() => {
                    download(resImg);
                  }}>下载</Button>
                </div>
              </div>
              <div className={styles.setting}>
                <div className={styles.testimg}>
                  {
                    testUrl?.map((e, i) => {
                      return (
                        <div onClick={() => { 
                          selectPrefab(i, product as ProductExperience)
                          setResImg(e) 
                          }}
                          className={cx(styles.setting_item, selectImg === i ? styles.active : '')} key={i}>
                          <Image preview={false} src={e} width={120} height={120} />
                        </div>
                      )
                    })
                  }
                </div>
                <div className={styles.optional}>
                  <div className={styles.option_title}>可选参数 ：</div>
                  <div  className={styles.setting_item}>
                    {renderProto()}
                  </div>
                </div>
                <div className={styles.collapse}>
                  <Collapse defaultActiveKey={['1']} onChange={onCollapseChange}>
                    <Panel className={styles.des} header="Request" key="1">
                      <p>{product?.reqDes}</p>
                    </Panel>
                    <Panel className={styles.des} header="Response" key="2">
                      <p>{product?.resDes}</p>
                    </Panel>
                  </Collapse>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default ProductPage;
