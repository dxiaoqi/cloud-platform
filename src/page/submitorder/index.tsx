import React, { Fragment, useState } from "react";
import { Divider, Row, Col, Card, Radio,Button,Input } from 'antd';
import { MinusOutlined, PlusOutlined, QuestionOutlined } from '@ant-design/icons';
import styles from './index.module.scss'

const ButtonGroup = Button.Group;

const options = [
    { label: '试唇色', value: 'Apple' },
    { label: '人脸美颜', value: 'Pear' },
];

const SubmitOrder: React.FC = (props) => {

    const [value3, setvalue3] = useState<string>('Apple');

    const onChange3 = (e: any) => {
        console.log('radio3 checked', e.target.value);
        setvalue3(e.target.value);
    };
    return (
        <Fragment>
            <div className={styles.submitorder__container}>
                <div className={styles.submitorder__header}>
                    <span>
                        <i>请确认以下商品信息</i>
                        <Divider type="vertical" />
                        <a href="">返回修改配置</a>
                    </span>
                </div>
                <div className={styles.submitorder__body}>
                    <div className={styles.submitorder__left}>
                     <Row>
                        <Col span={16} >                          
                            <p className={styles.submitorder__body_title}>商品清单</p>
                            <p className={styles.submitorder__body_proname}>人脸美颜新购 <i  className={styles.submitorder__body_price}>12.00元</i>  </p> 
                 
                            <Row>
                        <Col span={12} >
                        人脸美颜-1千次资源包：1千次资源包
                        </Col>
                        <Col span={8} >
                       <p> 单价：12.00元</p>
                       <p> 数量：1</p>
                       <p> 付款方式：预付费</p>
                       <p> 购买时长：一次性购买</p> 
                        </Col>
                        </Row>
                       
                        </Col>
                       
                    </Row>
                    <Row>
                        <Col span={16} >                          
                            <p className={styles.submitorder__body_title}> 
                        优惠券
                        </p>
                            <Row>
                        <Col span={8} >                        
                        
                       <p> <Radio> 使用代金券+
                           <a href="">兑换</a>
                           </Radio></p>
                       <p>您有0张与订单中产品相关的代金券</p>
                        </Col>
                        </Row>
                       
                        </Col>
                       
                    </Row>
                   
                        
                    </div>
                    <div className={styles.submitorder__right}>
                        
                <Row>
                    <Col span={24} >                          
                        <p className={styles.submitorder__body_title}>核对订单</p>
                        <Row>
                            <Col span={18} > 
                                <p>人脸美颜新购x1 </p>
                            </Col>
                            <Col span={6}>
                                <p >12.00元</p> 
                            </Col>
                        </Row>
                        <Row>
                            <Col span={18} >
                                <p>商品总计：</p>
                            </Col>
                            <Col span={6}>
                                <p >12.00元</p>
                            </Col>
                        </Row>
                        <hr/>
                        <Row>
                            <Col span={18} >       
                            <p> 实付款金额</p>
                            </Col>
                            <Col span={6}>
                                <p >12.00元</p> 
                            </Col>
                        </Row>
                    </Col>
                       
                </Row>
                        <Button type="primary" block className={styles.submitorder__submitBtn}>
                        提交订单
                        </Button>
                   
                       <p> 所有消费(包括购买、开通、续费等)均可开票，订单支付成功后，可前往 费用中心&gt发票管理开票 </p>
                       </div>

                   
                       </div>
                   
                   
                </div>
        </Fragment>
            )
        }
        export default SubmitOrder;
