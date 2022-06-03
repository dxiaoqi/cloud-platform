import React, { useState } from 'react';
import { Form, Input, Modal, Row, Col, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { TOKEN_TAG } from '../../constant';
import { useNavigate } from "react-router-dom";
import { updateSms, updatePwd } from "../../api/registe";
import styles from './index.module.scss'

const formItemLayout = {
    wrapperCol: { offset: 0, span: 24 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
const PasswordComponent: React.FC = props => {
    const [form] = Form.useForm();
    const [passwordForm] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDisabled, setIsDisabled] = useState<boolean>(false)
    const [codeText, setCodeText] = useState<string>('获取验证码')
    const [codeTime, setCodeTime] = useState<number>(59)

    const navigator = useNavigate();
    const login = () => {
        navigator(`/login`);
    }
    const onFinish = (values: any) => {
        showModal()
    };
    const onPassword = (values: any) => {
        const userName = form.getFieldValue('userName') || ''
        const code = passwordForm.getFieldValue('code') || ''
        const data = {
            userName: userName,
            code: code
        }
        updatePwd('/edit/password', data).then((res: any) => {
            if (res.data && res.data.code === 200) {
                message.success('修改密码成功，请先登录');
                setIsModalVisible(false);
                login()
                sessionStorage.setItem(TOKEN_TAG, '')
            }else{
                message.error('修改密码失败，失败原因'+res.data.msg);
                setIsModalVisible(false);
            } 

        }).catch((rej: any) => {
            setIsModalVisible(false);
            message.error('请求失败');
            console.log('rej', rej)
        })
    };
    const showModal = () => {
        setIsModalVisible(true);
    };



    const handleCancel = () => {
        // console.log('form',form.!current)
        passwordForm.resetFields();
        setIsModalVisible(false);
    };
    const throttle = () => {
        let count = codeTime || 59;
        return function () {
            const interval = setInterval(() => {
                count -= 1;
                setCodeTime(count);
                setCodeText(count + 's')
                if (count === 0) {
                    setIsDisabled(false)
                    setCodeText('获取验证码')
                    clearInterval(interval);
                }
            }, 1000);
        }
    }
    const getCode = () => {
        const userName = form.getFieldValue('userName') || ''
        if (!userName) {
            message.error('请先输入用户名');
            return
        }
        setIsDisabled(true)
        setCodeText('59s')
        updateSms('/update/sms?userName=' + userName).then((res: any) => {
            if (res.data && res.data.code === 200) {
                message.success('获取验证码成功');
            } else {
                setCodeText('获取验证码')
                setIsDisabled(false)
                message.error('获取验证码失败，失败原因' + res.data.msg, 10);
            }
        }).catch((rej: any) => {
            setCodeText('获取验证码')
            setIsDisabled(false)
            message.error('请求失败')
        })

        const test = throttle()
        // console.log('test', test())
    }
    //新密码一致校验
    const handleCheckPwd = (rules: any, value: any, callback: any) => {
        const regexp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
        if (!regexp.test(value)) {
            callback(new Error('请输入6-16位字符的密码,且包含数字和字母'));
        } else {
            callback();
        }
    }
    return (
        <div className={styles.password__container}>
            <div className={styles.header}>
                <h1>修改密码</h1>
                <span>记得密码?<a onClick={login}>立即登录</a></span>
            </div>
            <hr />
            <Form
                className="login-form"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{
                    residence: ['zhejiang', 'hangzhou', 'xihu'],
                    prefix: '86',
                }}
                scrollToFirstError
            >


                <Form.Item
                    name="userName"
                    label="用户名"
                    rules={[
                        {
                            required: true,
                            message: '请输入用户名!',
                        },
                    ]}
                >
                    <Input placeholder="请输入用户名" autoComplete='off' />
                </Form.Item>

                <Form.Item label="短信验证码">
                    <Row gutter={16}>
                        <Col span={14}>
                            <Form.Item
                                name="donation"
                                noStyle
                                rules={[{ required: true, message: '请输入短信验证码!' }]}
                            >
                                <Input placeholder="请输入验证码" autoComplete='off' />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Button type="primary" onClick={getCode} disabled={isDisabled}>{codeText}</Button>
                        </Col>
                    </Row>
                </Form.Item>

                <Form.Item
                    {...formItemLayout}
                >
                    <Button type="primary" htmlType="submit" block >
                        修改密码
                    </Button>
                </Form.Item>
            </Form>

            <Modal title="修改密码"
                visible={isModalVisible}
                footer={null}
            >
                <Form
                    className="login-form"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    form={passwordForm}
                    name="register"
                    onFinish={onPassword}
                >
                    <Form.Item
                        name="code"
                        label="新密码"
                        rules={[
                            {
                                validator: (rules, value, callback) => { handleCheckPwd(rules, value, callback) }
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password placeholder="请输入密码" autoComplete='off' />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="确认新密码"
                        dependencies={['code']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: '确认密码必填!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('code') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('两次输入的密码必须一致!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="确认新密码" autoComplete='off' />
                    </Form.Item>
                    <Form.Item
                        {...tailLayout}
                    >
                        <Button type="primary" htmlType="submit" style={{ margin: ' 0 40px' }}>
                            提交
                    </Button>
                        <Button type="primary" style={{ margin: ' 0 40px' }} onClick={handleCancel}>
                            取消
                    </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>

    )
}
export default PasswordComponent

