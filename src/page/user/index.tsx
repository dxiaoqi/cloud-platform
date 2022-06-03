import React, { Fragment, useEffect, useState } from "react";
import { Row, Col,message } from 'antd'
import { TOKEN_TAG } from '../../constant';
import { users } from '../../api/registe'
import styles from './index.module.scss'
const UserComponent: React.FC = (props) => {
    const [info, setInfo] = useState<any>({
        avatar: "",
        createTime: '',
        email: '',
        phone: '',
        userId: '',
        userName: '',
    })
    useEffect(() => {
        users('/user/profile','',{
            headers: {'Token': sessionStorage.getItem(TOKEN_TAG)}
          }).then((res: any) => {
           if(res.data&&res.data.code===200) {
                setInfo(res.data.data)
           }else {               
               message.error('用户查询失败，失败原因：'+res.data.msg)
           }
        }).catch((rej: any) => {
            message.error('请求失败')
        })
    }, [])
    return (
        <Fragment>
            <div className={styles.user__container}>
                <Row>
                    <Col span={24}> <h1>账号信息</h1></Col>
                </Row>
                <div className={styles.user_baseInfo}>
                    <p className={styles.user_flex}><i>基本信息</i> <a >帮助指引</a>  </p>
                    <Row>
                        <Col span={8}>
                            <p> 账号昵称：{info.userName} </p>
                            <p> 账号ID：{info.userId}</p>
                            <p> APPID: xxxxx</p>
                            <p> 注册时间： {info.createTime}</p>
                        </Col>
                        <Col span={16} className={styles.user__border}>
                            <p> 认证状态：<i className={styles.user_green}>已认证</i> <a>查看或修改认证</a>（如何修改 <a>个人/企业</a> 认证主体？） </p>
                            <p>所属行业：IT服务/软件-其他</p>
                            <p>联系手机 +86 {info.phone}     </p>
                        </Col>
                    </Row>
                </div>

                <div>
                            <div className={styles.user_baseInfo}>
                                <p className={styles.user_flex}><i>登录方式</i> <a >帮助指引</a></p>

                                <p > 账号支持多种登录方式，便捷管理云账号密码登录</p>
                                <Row>
                                    <Col span={8}>
                                        <p>微信(注册方式) 无 <a href="">绑定</a> </p>
                                        <p>qq 无   <a href="">绑定</a> </p>
                                        <p>企业微信 无  <a href="">绑定</a> </p>



                                    </Col>

                                    <Col span={16} className={styles.user__border}>
                                        <p> 邮箱 {info.email}   <a href="">解绑</a> </p>
                                        <p> 微信公众平台 无 绑定 无  <a href="">绑定</a> </p>
                                    </Col>
                                </Row>
                            </div>

                        {/* <Col span={8} >
                            <div className={styles.user_baseInfo}>
                                <p className={styles.user_flex}><i>团队管理 </i> <a >  快速进入CAM</a></p>
                                <Row>
                                    <p>在 <a href="">访问管理CAM</a>  内创建子用户供给您的团队成员，管理他们对云资源的访问权限
               </p>
                                    <p> 子账号数  0个 <a href="">快速创建子用户</a> </p>
                                    <p> 自定义策略数 0 个 <a href="">快速创建权限策略</a></p>
                                </Row>
                            </div>
                        </Col> */}
                </div>
                <div className={styles.user_baseInfo}>
                    <p className={styles.user_flex}><i>常见问题</i></p>
                    <Row>
                        <Col span={8}>
                            <p> <b className={styles.user_dot}></b> 一个手机号可以绑定几个云账户</p>
                            <p> <b className={styles.user_dot}></b>注册方式被解绑后，还能绑定登录方式吗</p>
                        </Col>
                        <Col span={8}>
                            <p> <b className={styles.user_dot}></b>如何修改账户绑定的微信/邮箱/QQ等</p>
                            <p> <b className={styles.user_dot}></b>怎么确认服务器、域名或者域名解析在那个账户</p>
                        </Col>
                        <Col span={8}>
                            <p> <b className={styles.user_dot}></b>实名认证会影响域名的备案吗</p>
                            <p> <b className={styles.user_dot}></b>账户如何注销</p>
                        </Col>
                    </Row>
                </div>

            </div>
        </Fragment>
    )
}
export default UserComponent;
