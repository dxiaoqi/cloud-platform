import React, { useEffect, useState } from "react";
import { Button, Image, Upload, Collapse, Tabs, Segmented } from 'antd';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import NavBar from "../../component/navbar";
import Footer from "../../component/footer";
import { fileByBase64, toDataURL } from '../../util';
import cx from 'classnames';
import styles from "./index.module.scss";
import Search from "antd/lib/input/Search";
import { genImg, getProductExperience } from "../../api";
import { ProductExperience } from "../../types";
import l from '../../assert/label.jpg'
const { Panel } = Collapse;
const testUrl = Array.from({length: 3}).map(e => l)

const ProductPage: React.FC = () => {
  const [img, setImg] = useState<string>(testUrl[0]);
  const [productList, setProductList] = useState<ProductExperience[]>([]);
  const [product, setProduct] = useState<ProductExperience>();
  const [selectImg, setSelect] = useState<number | null>(0);
  const upload  = (e: any) => {
    setImg(e as string);
    genImg(product?.url, {
      appid: '134134',
      img: e
    })
  };
  useEffect(() => {
    getProductExperience().then(res => {
      setProductList(res);
      setProduct(res[0]);
    })
  }, [])
  const props = {
    beforeUpload: (file : any) => {
      fileByBase64(file, e => {
        setSelect(null);
        upload(e);
      })
      return false;
    }
  };
  const selectPrefab = (id: number) => {
    // 设置Index，img
    setSelect(id);
    toDataURL(testUrl[id], e => {
      upload(e);
    })
  }
  const onCollapseChange = (key: string | string[]) => {
    console.log(key);
  }
  const setTabs = (value: string | number) => {
    setProduct(productList.find(e => e.title === value));
  }
  return (
    <div className={styles.page_container}>
      <NavBar />
      <div className={styles.product__container}>
        <div className={styles.title}>
          <p>漫画脸</p>
        </div>
        <div className={styles.panel}>
        <Segmented className={styles.seg} options={productList.map(e => e.title)} value={product?.title} onChange={setTabs}/>
          <p>产品体验 {product?.title}</p>
          <div className={styles.panel_content}>
            <div className={styles.panel_content_item}>
              <div className={styles.panel_content_left}>
                <div className={styles.panel_content_item_img}>
                  <ReactCompareSlider
                    className={styles.img_slider}
                    itemOne={<ReactCompareSliderImage src={img} width={400} height={400} srcSet={img} alt="Image one" />}
                    itemTwo={<ReactCompareSliderImage src={img} width={400} height={400} srcSet={img} alt="Image two" />}
                  />
                </div>
                <div className={styles.upload}>
                  <Upload {...props}>
                    <Button type='primary'>上传</Button>
                  </Upload>
                  <Search
                    className={styles.search}
                    placeholder="输入网址"
                    enterButton="提交"
                    size="middle"
                    onSearch={e => console.log(e)}
                  />
                  <Button>下载</Button>
                </div>
              </div>
              <div className={styles.setting}>
                <div className={styles.testimg}>
                  {
                    testUrl.map((e, i) => {
                      return (
                        <div onClick={() => { selectPrefab(i) }} className={cx(styles.setting_item, selectImg === i ? styles.active : '')} key={i}>
                          <Image preview={false} src={e} width={120} height={120} />
                        </div>
                      )
                    })
                  }
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
