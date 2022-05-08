import React, { useState } from "react";
import { Button, Image, Upload, Collapse } from 'antd';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import NavBar from "../../component/navbar";
import Footer from "../../component/footer";
import { fileByBase64 } from '../../util';
import cx from 'classnames';
import styles from "./index.module.scss";
import Search from "antd/lib/input/Search";
const { Panel } = Collapse;
const url = 'https://tiia-demo-default-1254418846.cos.ap-guangzhou.myqcloud.com/DetectLabel2.jpg'
const testUrl = Array.from({length: 3}).map(e => url)
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const ProductPage: React.FC = () => {
  const [img, setImg] = useState<string>(testUrl[0]);
  const [selectImg, setSelect] = useState<number | null>(0);
  const upload  = (file: any) => {
    console.log("upload");
  };
  const props = {
    beforeUpload: (file : any) => {
      fileByBase64(file, e => {
        setSelect(null);
        setImg(e as string);
        upload(e);
      })
      return false;
    }
  };
  const selectPrefab = (id: number) => {
    // 设置Index，img
    setSelect(id);
    setImg(testUrl[id]);
  }
  const onCollapseChange = (key: string | string[]) => {
    console.log(key);
  }
  return (
    <div className={styles.page_container}>
      <NavBar />
      <div className={styles.product__container}>
        <div className={styles.title}>
          <p>漫画脸</p>
        </div>
        <div className={styles.panel}>
          <p>产品体验</p>
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
                    <Panel header="Request" key="1">
                      <p>{text}</p>
                    </Panel>
                    <Panel header="Response" key="2">
                      <p>{text}</p>
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
