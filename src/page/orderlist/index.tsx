import React, { Fragment } from "react";
import { Tabs, Table, Tag, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import NavBar from "../../component/navbar";
import Footer from "../../component/footer";
import styles from './index.module.scss'

const { TabPane } = Tabs;
interface User {
    key: string;
    name: string;
    age:number;
    address:string;
    tags:object,
  }
const columns : ColumnsType<User>= [
    {
        title: '订单号',
        dataIndex: 'name',
        key: 'name', 
        align:'center' as 'center',
        render: (text:any) => <a>{text}</a>,
    },
    {
        title: '产品名称',
        dataIndex: 'age',
        key: 'age',
        align:'center' as 'center',
    },
    {
        title: '子产品名称',
        dataIndex: 'address',
        key: 'address',
        align:'center' as 'center',
    },
    {
        title: '订单时间',
        dataIndex: 'address',
        key: 'address',
        align:'center' as 'center',
    },
    {
        title: '状态',
        dataIndex: 'address',
        key: 'address',
        align:'center' as 'center',
    },
    {
        title: '订单金额(元)',
        dataIndex: 'address',
        key: 'address',
        align:'center' as 'center',
    },
    {
        title: '类型',
        key: 'tags',
        dataIndex: 'tags',
        align:'center' as 'center',
        render: (tags:any) => (
            <>
                {tags.map((tag:any) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        align:'center' as 'center',
        render: (text:any, record:any) => (
            <Space size="middle">              
                <a>详情</a>
            </Space>
        ),
    },
];

const data: User[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];

const OrderList: React.FC = (props) => {
    const callback = (values: any) => {
        console.log('Received values of form: ', values);
    };
    return (
        <Fragment>
            <div className={styles.h100}>
                <NavBar />
                <div className={styles.order__container}>
                    <p className={styles.order__header}>最新订单<i>显示最近3个月的订单</i><a href="">查看全部</a></p>
                    <Tabs defaultActiveKey="1" onChange={callback}>
                        <TabPane tab="预付费订单" key="1">
                            <Table columns={columns} dataSource={data} />
                        </TabPane>
                        <TabPane tab="后续付费订单" key="2">
                            Content of Tab Pane 2
                         </TabPane>

                    </Tabs>
                </div>
                <Footer />
            </div>
        </Fragment>
    )
}
export default OrderList;
