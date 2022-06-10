import React from 'react'
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { TOKEN_TAG } from '../../constant';
import { login, account } from "../../api/registe";
import styles from './index.module.scss'
const LoginComponent: React.FC = props => {

    const navigator = useNavigate();
    const register = () => {
        navigator(`/register`);
    }
    const changePassword = () => {
        navigator(`/password`);
    }
    const onFinish = (values: any) => {
        // console.log('values',values)
        const data = {
            userName: values.userName,
            password: values.password
        }
        login('/login', data).then((res: any) => {
            if (res.data && res.data.code === 200) {
                message.success('登录成功');
                sessionStorage.setItem(TOKEN_TAG, res.data.data.token)
                sessionStorage.setItem('userName', values.userName)
                account('/user/account','',{
                    headers: {'Token': sessionStorage.getItem(TOKEN_TAG)}
                  }).
                    then((res: any) => {
                        if (res.data && res.data.code === 200) {
                            sessionStorage.setItem("appID",res.data.data.appId)
                        }else {
                            message.error('应用信息查询失败，失败原因：'+res.data.msg)
                        }
                    })
                    .catch((rej: any) => {
                        console.log('rej', rej)
                        message.error('请求失败')
                    })
                navigator('/')
            } else {
                message.error('登录失败，失败原因：' + res.data.msg);
            }
        }).catch((rej: any) => {
            message.error('请求失败');
        })
    };
    return (
        <div className={styles.body}>
            <div className={styles.header}>
                <h1>登录</h1>
                <span>还没有账号?<a onClick={register}>立即注册</a></span>
            </div>
            <hr />
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="userName"
                    rules={[
                        {
                            required: true,
                            message: '请输入用户名',
                        },
                    ]}
                >
                    <Input autoComplete='off' prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: '请输入密码',
                        },
                    ]}>
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="请输入密码" autoComplete='off'
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>记住登录账号名</Checkbox>
                    </Form.Item>

                    <a className={styles.right} onClick={changePassword}>
                        忘记密码
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" block>
                        登录
                     </Button>
                </Form.Item>
            </Form>

        </div>

    )
}
export default LoginComponent

