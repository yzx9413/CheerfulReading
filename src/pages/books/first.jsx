import React, { Component } from 'react';
import { connect } from 'dva';

import { Table, Divider, Button, Modal, Input } from 'antd';

import 'antd/dist/antd.css';
const { TextArea } = Input;
const { Column } = Table;

class First extends Component {
    componentDidMount() {
        this.props.getList();
    }

    state = {
        visible: false,
        confirmLoading: false,
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 2000);
    }

    handleCancel = () => {
        console.log('Clicked cancel button', '点击通知触发');
        this.setState({
            visible: false,
        });
    }

    render() {
        const { visible, confirmLoading, ModalText } = this.state;
        const { data } = this.props.booksList;
        const { list } = data ? data : [];
        return (
            <div>
                <Table dataSource={list}>
                    <Column title="ID" dataIndex="id" key="id" />
                    <Column title="门店名称" dataIndex="name" key="name" width='15%' />
                    <Column title="住址" dataIndex="address" key="address" />
                    <Column title="城市" dataIndex="city" key="city" />
                    <Column title="门店图片" dataIndex="img" key="img" width='15%'
                        render={img => (<img style={{ width: '50%', height: 'auto' }} src={img} alt="" />)}
                    />
                    <Column title="收入" dataIndex="income" key="income" />
                    <Column title="门店状态" dataIndex="status" key="status" render={status => (status ? "正常营业" : "门店关闭")} />
                    <Column title="门店物品数量" dataIndex="info" key="info" width='15%' />
                    <Column title="操作" dataIndex="create_time" key="operation"
                        render={create_time => (
                            ["编辑", "取消"].map(v => <Button onClick={this.showModal} type="primary" key={v}>{v}</Button>)
                        )}
                    />
                </Table>

                <Modal
                    title="店铺信息编辑"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <div>门店名称:<Input placeholder="请输入" /></div>
                    <div>住址:<Input placeholder="请输入" /></div>
                    <div>地址:<Input placeholder="请输入" /></div>
                    <div>门店状态:<Input placeholder="请输入" /></div>
                    <div>门店信息:<TextArea placeholder="请输入" autosize /></div>
                </Modal>

            </div>
        );
    }
}
const a = (state) => {
    return {
        booksList: state.book.list
    }
}
const b = dispatch => {
    return {
        getList: type => {
            dispatch({
                type: 'book/getBooksList', payload: type
            })
        }
    }
}
export default connect(a, b)(First);
