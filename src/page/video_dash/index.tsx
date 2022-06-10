import React, { useState } from 'react'
import NavBar from '../../component/navbar/index';
import Footer from '../../component/footer';
import { useNavigate } from "react-router-dom";
import { Button, Space, Modal, Row, Col } from 'antd'

import styles from './index.module.scss'
const BtMap = [
    {
        url: 'http://www.w3schools.com/html/mov_bbb.mp4',
        key: 'edu',
        name: '教育',
        title: '教育数字人',
        des_a: '生成教师虚拟数字形象',
        des_b: '并与数字教学内容、场景等深度融合'
    }, {
        url: 'http://www.w3schools.com/html/mov_bbb.mp4',
        key: 'finance',
        name: '金融',
        title: '金融数字人',
        des_a: '适合金融行业的客户',
        des_b: '适用于营销、培训等业务场景'
    }, {
        url: 'http://www.w3schools.com/html/mov_bbb.mp4',
        key: 'acre',
        name: '地产',
        title: '地产数字人',
        des_a: '迎合新消费人群需求',
        des_b: '提供新的运营模式，数字人强势助力房地产行业'
    }
]
const options = [
    { label: '选择模板', value: 'Apple' },
    { label: '选择角色', value: 'Pear' },
    { label: '输入文本', value: 'Orange' },
    { label: '生成视频', value: 'balan' },
];
const languageMap = [{
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
const VideoDash: React.FC = () => {
    const [type, setType] = useState<any>('Apple')
    const [toPath, setToPath] = useState<any>('/product')
    const [moives, setMoives] = useState<any>(BtMap)
    const [language, setLanguage] = useState<any>(languageMap)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [showMoive, setShowMoives] = useState<{ text: string | undefined; url: string | undefined } | null>(null);

    const navigator = useNavigate();
    const switchTab = (type: string) => {
        setType(type);
    }

    return (
        <div>
            <NavBar />
            <div className={styles.container}>
                <div className={styles.slogan}>
                </div>
                <p className={styles.des}>ALL TEMPLATES</p>
                <div className={styles.arrow}>
                    <div className={styles.fourP}>
                        <p></p>
                        <p></p>
                        <p className={styles.arrow_top}></p>
                        <p></p>
                    </div>
                    <div className={styles.fourP}>
                        <p></p>
                        <p className={styles.arrow_bottom} style={{ borderTop: '#0057ff 2px solid' }}></p>
                        <p className={styles.arrow_bottom} style={{ borderTop: '#0057ff 2px solid' }}></p>
                        <p className={styles.arrow_bottom}></p>
                    </div>
                </div>
                <div className={styles.bts}>
                    {
                        BtMap.map(b => {
                            return (
                                <Button type='text'
                                     size='large'
                                    key={b.name}
                                    className={
                                        type === b.key ? '' : styles.active
                                    }>
                                    {b.name}
                                </Button>
                            )
                        })
                    }
                </div>
                <div className={styles.moives}>
                    {
                        moives.map((m: any) => {
                            return (
                                <div key={m.key}>
                                    <video src={m.url} controls width={320} height={180}></video>

                                    <h3>{m.title}</h3>
                                    <p>{m.des_a}</p>
                                    <p>{m.des_b}</p>
                                    <span className={styles.seeTemplath} onClick={()=>{
                                          navigator(`/videoAvatar`)
                                    }}>SEE TEMPLATH</span>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={styles.title}>
                    简单4步，即可生成专业的视频
                </div>
                <p className={styles.avatar}>初学者也可简单上手，随你所需，随心编辑</p>
                <div className={styles.produce}>
                    <div className={styles.group}>
                        {
                            options.map((item: any) => {
                                return (<div key={item.value} className={
                                    type === item.value ? styles.group_cur : ''
                                }
                                    onClick={() => switchTab(item.value)}
                                >{item.label}</div>)
                            })
                        }

                    </div>
                    <div className={styles.container_movies}>

                    </div>
                </div>
                <div className={styles.title}>
                    现支持10种语言
                </div>
                <p className={styles.avatar}>语言库持续更新中，听听现在不同语种的效果吧</p>
                <div>
                    <Space>
                        <Button type="primary" size='large' style={{  fontFamily: 'GlowSansSC-Extended-Medium', }} onClick={()=>{
                            navigator(`/productVideo`)
                        }}>Create a free AI video</Button>
                        <Button  size='large' style={{  fontFamily: 'GlowSansSC-Extended-Medium', }}
                        onClick={()=>{
                            navigator(`/language`)
                        }}>Language support</Button>
                    </Space>
                </div>
                <div className={styles.container_language}>
                    <div className={styles.languageList}>
                        {
                            language.map((m: { url: string | undefined; text: string }) => {
                                return (
                                    <div>
                                        <Button type='dashed' onClick={() => {
                                            setShowMoives(m)
                                            setIsModalVisible(true)
                                        }}>
                                            {m.text}
                                        </Button>
                                    </div>

                                )
                            })
                        }
                    </div>
                </div>
                <div className={styles.slogan_footer}>
                    <Row justify="space-evenly">
                        <Col span={10}>
                            <h2>价位合理</h2>
                            <p>自主研发，离线部署，一对一针对性服务，价格优惠</p>
                        </Col>
                        <Col span={10}>
                            <h2>拟人度高</h2>
                            <p>采用喊个领先的技术构建语音驱动系统</p>
                            <p> 具备呵斥速度快，语音流畅自然，音质饱满等特点</p>
                        </Col>
                    </Row>
                    <Row justify="space-evenly">
                        <Col span={10}>
                            <h2> 可定定制化</h2>
                            <p>可根据用户需求针对性进行开发，提供特色服务</p>
                        </Col>
                        <Col span={10}>
                            <h2>多场景语音库</h2>
                            <p>提供多种高品质语音资库，并不定期更新</p>
                        </Col>
                    </Row>
                </div>
                <div className={styles.footer}>
                <div className={styles.footerItem}>
                        <p>关于我们</p>
                    </div>
                    <div className={styles.footerItem}>
                        <p>联系方式</p>
                        <span><b>联系电话</b>：15718851829(林恩)</span>
                        <span><b>联系邮箱</b>：lynntang@zhiyin-tec.com</span>
                    </div>
                    <div className={styles.footerItem}>
                        <p >投资者</p>
                    </div>
                    <div className={styles.footerItem}>
                        <p >使用条款</p>
                    </div>
                </div>
            </div>

            <Modal className={styles.modal} title={showMoive ?.text} visible={isModalVisible} footer={null} onCancel={() => { setIsModalVisible(false) }}>
                <video className={styles.video} src={showMoive ?.url} controls></video>
            </Modal>
            {/* <Footer /> */}
        </div >
    )
}
export default VideoDash