import React, { Fragment, useEffect,useState } from "react";
import { Row, Col,Button,message } from 'antd';
import { TOKEN_TAG } from '../../constant';
import { account ,setappId} from '../../api/registe'
import styles from './index.module.scss'
const ApplicationComponent: React.FC = (props) => {
    const [acount,setAcount] = useState<any>({
        aiTime: 0,
        appId: null,
        appKey: null,
        status: 0,
        userId: null,
    })
    const getAppId = ()=>{
        setappId('/user/set/account','',{
            headers: {'Token': sessionStorage.getItem(TOKEN_TAG)}
          }).then((res:any)=>{    
            if(res.data&&res.data.code===200)     {
                message.success('设置appId成功了')
                setAcount(res.data.data)
               
                localStorage.setItem("appID",res.data.data.appId)
            }  
           else {
            message.error('设置appId失败了'+res.data.msg)
           }
        }) 
        .catch((rej: any) => {
            
            message.error('请求失败')
            console.log('rej', rej)
        })
    }
    useEffect(() => {
        account('/user/account','',{
            headers: {'Token': sessionStorage.getItem(TOKEN_TAG)}
          }).
            then((res: any) => {
                if (res.data && res.data.code === 200) {
                    localStorage.setItem("appID",res.data.data.appId)
                    setAcount(res.data.data)
                }else {
                    message.error('应用信息查询失败，失败原因：'+res.data.msg)
                }
            })
            .catch((rej: any) => {
                console.log('rej', rej)
                message.error('请求失败')
            })
    },[])

    return (
        <Fragment>
            <div className={styles.application__container}>
                <Row>
                    <Col span={24}> <h1> 我的秘钥</h1></Col>
                </Row>

                <div className={styles.application_baseInfo}>
                    <Row>
                        <Col span={8}>
                            <p> appKey：{acount.appKey?acount.appKey:'暂无'} </p>
                            <p> 当前调用次数： {acount.aiTimes}次 </p>
                        </Col>
                        <Col span={16} className={styles.user__border}>
                            <p> appId：{acount.appId?acount.appId:'暂无'} 
                            {acount.appId?'':(<Button onClick={getAppId} type="link"  size='small' style={{ margin:'0 5px' }}>生成appId</Button>) }   
                            </p>
                        </Col>
                    </Row>
                </div>
            </div>
        </Fragment>
    )
}
export default ApplicationComponent;
