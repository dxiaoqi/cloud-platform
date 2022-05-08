import React, { useEffect, useState } from "react";
import { Button } from "antd";
import NavBar from "../../component/navbar";
import Footer from "../../component/footer";
import { getProductList } from '../../api'
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
type ProductType = {
  id: number;
  title: string;
  description: string;
}
const Home: React.FC = (props) => {
  const [productList, setProductList] = useState<ProductType[]>([]);
  const navigator = useNavigate();
  useEffect(() => {
    getProductList().then(res => {
      setProductList(res as ProductType[]);
    }
    );
  }, [])
  const goProductPage = (id: number) => {
    navigator(`/product/${id}`);
  }
  return (
    <div>
      <NavBar />
      <div className={styles.home__container}>
        <div className={styles.company_info}>
          <div className={styles.left}>
            <p>AI <span>Algorithms</span></p>
            <p>国内领先的图像内容生成技术和语音相关技术</p>
            <p>多年核心算法研发及服务经验</p>
            <p className={styles.label}>
              图像、语音等领域内建立多模态全生态服务
            </p>
          </div>
          <div className={styles.right}>
          </div>
        </div>
        <div className={styles.about_us}>
        
        </div>
        <div className={styles.product}>
          <div className={styles.product_list}>
            {
              productList.map(item => {
                return (
                  <div className={styles.product_list_item_container}>
                    {/* <div className={styles.product_list_item_img}>
                      <img src={item.img} alt="" />
                    </div> */}
                    <div className={styles.product_list_item_info}>
                      <p className={styles.product_title}>{item.title}</p>
                      <p className={styles.product_des}>{item.description}</p>
                    </div>
                    <div>
                      <Button onClick={() => {goProductPage(item.id)}} className={styles.product_list_item_btn}>
                        查看详情
                      </Button>
                    </div>
                  </div>
                )
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default Home;