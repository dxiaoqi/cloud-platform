import React, { Fragment, useState } from "react";
import { Divider, Row, Col, Card, Radio, Button, Input } from 'antd';
import { MinusOutlined, PlusOutlined, QuestionOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import styles from './index.module.scss'

const ButtonGroup = Button.Group;

const options = [
    { label: '试唇色', value: 'Apple' },
    { label: '人脸美颜', value: 'Pear' },
];

const Purchase: React.FC = (props) => {
    const [value_10000, setvalue_10000] = useState<number>(0)
    const [value_1000, setvalue_1000] = useState<number>(0)
    const [value3, setvalue3] = useState<string>('Apple');
    const navigator = useNavigate();

    const onChange3 = (e: any) => {
        console.log('radio3 checked', e.target.value);
        setvalue3(e.target.value);
    };
    const goPay = (value_1000:any,value_10000:any) =>{
        navigator(`/submitorder/1`);
    }
    const increase = (value: number, type: any) => {
        switch (type) {
            case 1: return setvalue_1000(++value);
            case 2: return setvalue_10000(++value);
        }
    };

    const decline = (value: number, type: any) => {

        if (value <= 0) {
            return
        }
        switch (type) {
            case 1: return setvalue_1000(--value);
            case 2: return setvalue_10000(--value);
        }
    };
    return (
        <Fragment>
            <div className={styles.purchase__container}>
                <div className={styles.purchase__header}>
                    <span>
                        <i>人脸试装</i>
                        <Divider type="vertical" />
                        <a href="">返回产品详情</a>
                    </span>
                    <span>产品文档<Divider type="vertical" />计费说明</span>
                </div>
                <div className={styles.purchase__body}>
                    <p className={styles.purchase__body_title}>选择配置</p>
                    <Row className={styles.purchase__body_row} >
                        <Col span={4} >
                            计费方式
                        </Col>
                        <Col span={20}>
                            <Card style={{ width: 600 }} className={styles.purchase__body_card}>
                                <p className={styles.purchase__card_p}>调用次数计费</p>
                                <p> 购买资源包可以抵扣当月及之后产生的调用量</p>
                            </Card>
                        </Col>
                    </Row>
                    <Row className={styles.purchase__body_row}>
                        <Col span={4} >
                            服务类型
                        </Col>
                        <Col span={20}>
                            <Radio.Group
                                options={options}
                                onChange={onChange3}
                                value={value3}
                                optionType="button"
                                buttonStyle="solid"
                            />
                            <br />
                            <p>自然、精准、贴合的在线试唇色服务，解决虚拟场景的试妆需求</p>
                        </Col>
                    </Row>
                    <Row className={styles.purchase__body_row}>
                        <Col span={4} >
                            资源包
                        </Col>
                        <Col span={20} className={styles.purchase__body_col}>
                            <Card style={{ width: '65%' }} className={styles.purchase__body_card}>
                                <div className={styles.purchase__card_p}>
                                    <div>
                                        <p> 一千次资源包</p>
                                        <p>有效期至购买之日一年内</p>
                                    </div>
                                    <div style={{ color: 'orange' }}>
                                        12.00元
                                </div>
                                </div>
                            </Card>
                            <Card style={{ width: '33%', }} className={styles.purchase__body_number}>
                                <ButtonGroup>
                                    <Button onClick={() => decline(value_1000, 1)} >
                                        <MinusOutlined />
                                    </Button>
                                    <Input placeholder="0" value={value_1000} disabled className={styles.purchase__number} />
                                    <Button onClick={() => increase(value_1000, 1)}>
                                        <PlusOutlined />
                                    </Button>

                                </ButtonGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Row className={styles.purchase__body_row}>
                        <Col span={4} >
                        </Col>
                        <Col span={20} className={styles.purchase__body_col}>
                            <Card style={{ width: '65%' }} className={styles.purchase__body_card}>
                                <div className={styles.purchase__card_p}>
                                    <div>
                                        <p> 一万次资源包</p>
                                        <p>有效期至购买之日一年内</p>
                                    </div>
                                    <div style={{ color: 'orange' }}>
                                        68.00元
                                </div>
                                </div>
                            </Card>
                            <Card style={{ width: '33%', }} className={styles.purchase__body_number}>
                                <ButtonGroup>
                                    <Button onClick={() => decline(value_10000, 2)}>
                                        <MinusOutlined />
                                    </Button>
                                    <Input placeholder="0" value={value_10000} disabled className={styles.purchase__number} />
                                    <Button onClick={() => increase(value_10000, 2)}>
                                        <PlusOutlined />
                                    </Button>

                                </ButtonGroup>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <div>

                </div>
                <div className={styles.purchase__footer}>                   
                    <Row className={styles.purchase__footer_header}>
                        <Col span={4} >
                            费用：
                        </Col>
                        <Col span={4} className={styles.purchase__footer_header_col}>
                         ￥{value_10000 * 68 + value_1000 * 12} <i>元</i>
                        </Col>
                    </Row>
                    <Row className={styles.purchase__body_row}>
                        <Col span={20} >
                        </Col>
                        <Col span={4} className={styles.purchase__body_col}>

                            <Button type="primary" onClick={()=>{goPay(value_1000,value_10000)}}>立即购买</Button>
                        </Col>
                    </Row>

                </div>
            </div>
        </Fragment>
    )
}
export default Purchase;
