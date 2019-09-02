import React, {
	Component,
	useEffect,
	useState,
	useRef,
} from 'react';
import {
	Table,
	Pagination,
	Button,
	Message,
	Dialog,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import Modify from './components/Modify';

const getData = (data) => {
	return [{
		id: 1,
		name: 'wjh',
		ip: '127.0.0.1',
		port: 5555,
		group: 'aaa',
		user: 'aaa',
		password: '123456',
		status: '正常',
		time: utils.formatUnix(utils.getDate() / 1000, 'Y-M-D h:m:s'),
	}, {
		id: 2,
		name: 'qwe',
		ip: '127.0.0.2',
		port: 8888,
		group: 'bbb',
		user: 'bbb',
		password: '123456',
		status: '正常',
		time: utils.formatUnix(utils.getDate() / 1000, 'Y-M-D h:m:s'),
	}];
};

const {
	Column,
} = Table;
const limit = 10;

function List({
	history,
}) {
	const [curPage, setCurPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [count, setCount] = useState(0);
	const [modify, setModify] = useState(null);
	const [modifyIndex, setModifyIndex] = useState(0);
	const [show, setShow] = useState(false);
	let cancelTask = false; // 防止内存泄露

	useEffect(() => {
		function fetchData() {
			setLoading(true);
			// api.find({
			// 	limit,
			// 	offset: (curPage - 1) * limit,
			// }).then((res) => {
			// 	if (cancelTask) {
			// 		return;
			// 	}
			// 	const {
			// 		total,
			// 		trends,
			// 	} = res;
			// 	setCount(total);
			// 	setData(getData(trends));
			// }).catch((e) => {
			// 	Message.success(e.toString());
			// }).finally(() => {
			// 	if (cancelTask) {
			// 		return;
			// 	}
			// 	setLoading(false);
			// });
			setTimeout(() => {
				setData(getData());
				setLoading(false);
			}, 500);
		}

		if (curPage > 0) {
			fetchData();
		}

		return () => {
			cancelTask = true;
		};
	}, [curPage]);

	const pageChange = (e) => {
		setCurPage(e);
	};

	const handleModify = (e, index) => {
		setModifyIndex(index);
		setModify({...e});
		setShow(true);
	};

	const onClose = (e) => {
		setShow(false);
	};

	const onOk = (value) => {
		data[modifyIndex] = value;
		setShow(false);
	};

	const handleEnter = (e) => {
		history.push('/operation/status', e);
	};

	const renderCover = (value, index, record) => {
		return (
			<div>
				<Button className={styles.btn} type="primary" onClick={handleModify.bind(this, record, index)}>
	        修改
	      </Button>
	      <Button type="primary" onClick={handleEnter.bind(this, record)}>
	        进入
	      </Button>
      </div>
		);
	};

	return (
		<div>
      <IceContainer id="wrap">
        <Table loading={loading} dataSource={data} hasBorder={false}>
          <Column title="id" dataIndex="id" />
          <Column title="微博名称" dataIndex="name" />
          <Column title="代理ip" dataIndex="ip" />
          <Column title="代理端口" dataIndex="port" />
          <Column title="代理用户" dataIndex="user" />
          <Column title="代理密码" dataIndex="password" />
          <Column title="用户组" dataIndex="group"  />
          <Column title="用户状态" dataIndex="status" />
          <Column title="更新时间" dataIndex="time" />
          <Column title="操作" cell={renderCover} />
        </Table>

        <Pagination
          className={styles.pagination}
          current={curPage}
          total={count}
          onChange={pageChange}
        />
      </IceContainer>
	   	<Dialog 
	   		autoFocus
	      visible={show} 
	      onClose={onClose}
	      footer={false}
	    >
	    	<Modify value={modify} onOk={onOk} />
	    </Dialog>
    </div>
	);
}

export default withRouter(List);