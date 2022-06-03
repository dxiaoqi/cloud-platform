import React, { useState } from 'react';
import { Form, Input, message, Cascader, Select, Row, Col, Checkbox, Button } from 'antd';

import { registe, sms } from "../../api/registe";
import { useNavigate } from "react-router-dom";
import styles from './index.module.scss'


const { Option } = Select;

const residences = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                    },
                ],
            },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                ],
            },
        ],
    },
];

const formItemLayout = {
    wrapperCol: { offset: 0, span: 24 },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const RegisterComponent: React.FC = props => {
    const [isDisabled, setIsDisabled] = useState<boolean>(false)
    const [codeText, setCodeText] = useState<string>('获取验证码')
    const [codeTime, setCodeTime] = useState<number>(59)
    const [form] = Form.useForm();
    const navigator = useNavigate();
    const login = () => {
        navigator(`/login`);
    }
    const onFinish = (values: any) => {
        const data = {
            userName: values.userName,
            email: values.email,
            phone: values.phone,
            password: values.password,
            code: values.code
        }
        registe('/register', data).then((res: any) => {
            if (res.data && res.data.code === 200) {
                message.success('注册成功')
                // localStorage.setItem('token', res.data.data.token)
                navigator('/login')
            }else{
                message.error('注册失败，失败原因：'+res.data.msg)
            }
        }).catch((rej: any) => {
            message.error('请求失败')
        })
        console.log('Received values of form: ', values);
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
            </Select>
        </Form.Item>
    );

    //   节流
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
        // let canRun: boolean = true;
        // return function () {
        //     console.log('tiem', time)
        //     if (!canRun) return;
        //     canRun = false;
        //     setTimeout(() => {
        //         fn()
        //         canRun = true;
        //         setIsDisabled(false)
        //         setCodeText('获取验证码')
        //     }, time);
        // };
    }

    const getCode = () => {
        const phone = form.getFieldValue('phone') || ''
        if (!phone) {
            message.error('请先输入手机号');
            return
        }
        setIsDisabled(true)
        setCodeText('59s')
        sms('/sms?phone=' + phone).then((res: any) => {
            if(res.data&&res.data.code === 200) {
                message.success('验证码获取成功');
            }else {
                
                setCodeText('获取验证码')
                setIsDisabled(false)
                message.error('验证码获取失败，失败原因：'+res.data.msg,10);
            }
        }).catch((rej: any) => {             
            setCodeText('获取验证码')
            setIsDisabled(false)          
            message.error('验证码获取失败');
        })

        const test = throttle()
        console.log('test', test())
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
    const validateTel = (rules: any, value: any, callback: any) => {
        const regexp = /^(\+\d{2,3}-)?\d{11}$/;
        if (!value) {
            callback(new Error('手机号码必填'));
        } else if (!regexp.test(value)) {
            callback(new Error('请输入正确的手机号码格式'));
        } else {
            callback();
        }
    }
    return (
        <div className={styles.body}>
            <div className={styles.header}>
                <h1>注册</h1>
                <span>已有账号?<a onClick={login}>立即登录</a></span>
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
                    label="用户昵称"
                    rules={[{ required: true, message: '用户昵称必填!', whitespace: true }]}
                >
                    <Input placeholder="用户昵称" autoComplete='off' />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="邮箱地址"
                    rules={[
                        {
                            type: 'email',
                            message: '邮箱地址无效!',
                        },
                        {
                            required: true,
                            message: '邮箱地址必填!',
                        },
                    ]}
                >
                    <Input placeholder="邮箱地址" autoComplete='off' />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="密码"
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
                    label="确认密码"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: '请输入确认密码!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('两次密码必须一致!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="确认密码" autoComplete='off' />
                </Form.Item>


                <Form.Item
                    name="phone"
                    label="手机号码"
                    rules={[
                        {
                            validator: (rules, value, callback) => { validateTel(rules, value, callback) }
                        },

                    ]}
                >
                    <Input addonBefore={prefixSelector} style={{ width: '100%' }} autoComplete='off' />
                </Form.Item>

                <Form.Item label="短信验证码">
                    <Row gutter={16}>
                        <Col span={14}>
                            <Form.Item
                                name="code"
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
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                        },
                    ]}
                    {...tailFormItemLayout}
                >
                    <Checkbox>
                        我同意 <a href="">《xx协议》</a>
                    </Checkbox>
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                >
                    <Button type="primary" htmlType="submit" block >
                        注册
                    </Button>
                </Form.Item>
            </Form>

        </div>

    )
}
export default RegisterComponent

