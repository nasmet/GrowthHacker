import React, {
	useRef,
	useState,
} from 'react';
import {
	Button,
	Table,
	Pagination,
	Dialog,
	Loading,
	Drawer,
} from '@alifd/next';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import CreateOriginData from './components/CreateOriginData';
import OriginDataDetails from './components/OriginDataDetails';

export default  function OriginData() {
	const [showDrawer, setShowDrawer] = useState(false);
	const [values, setValues] = useState({});
	const refDialog = useRef(null);

	const {
		parameter,
		response,
		loading,
		updateParameter,
		updateResponse,
		showLoading,
		closeLoading,
	} = hooks.useRequest(api.getOriginData, {
		limit: config.LIMIT,
		offset: 0,
	});

	const {
		data = [],
			total = 0,
	} = response;

	const pageChange = e => {
		updateParameter(Object.assign({}, parameter, {
			offset: (e - 1) * config.LIMIT,
		}));
	};

	const onDeleteOriginData = (id, index) => {
		Dialog.confirm({
			content: '确定删除吗？',
			onOk: () => {
				showLoading();
				api.deleteOriginData({
					id,
				}).then(() => {
					data.splice(index, 1);
					updateResponse();
					model.log('删除成功');
				}).catch((e) => {
					model.log(e);
				}).finally(() => {
					closeLoading();
				});
			},
		});
	};

	const onView = (id, name, value_type) => {
		setValues({
			id,
			name,
			value_type,
		});
		setShowDrawer(true);
	}

	const renderCover = (value, index, record) => {
		const {
			id,
			value_type,
			name,
		} = record;
		return (
			<div>
				<Button type='primary' style={{marginRight:'10px'}} onClick={onView.bind(this,id,name,value_type)}> 
					查看
				</Button>
				<Button type='primary' warning onClick={onDeleteOriginData.bind(this,id,index)}> 
					删除
				</Button>
			</div>
		);
	};

	const onCreateOriginData = () => {
		refDialog.current.onShow();
	};

	const onOk = (value) => {
		data.splice(0, 0, value);
		updateResponse();
	};

	const onCloseDrawer = () => {
		setShowDrawer(false);
	};

	return (
		<Components.Wrap>
			<IceContainer>
				<div className={styles.btnWrap}>
					<Button className={styles.btn} type="secondary" onClick={onCreateOriginData}> 
						创建元数据
					</Button>
				</div>
				
				<Loading visible={loading} inline={false}>
					<Table 
						dataSource={data} 
						hasBorder={false}
					>	
						<Table.Column title="id" dataIndex="id" width={120} />
						<Table.Column title="名称" dataIndex="name" width={120} />
						<Table.Column title="标识符" dataIndex="key" width={120} />
						<Table.Column title="类型" dataIndex="value_type" width={120} />
						<Table.Column title="描述" dataIndex="desc" />
						<Table.Column title="操作" cell={renderCover} />
					</Table>
				</Loading>

				<Pagination
					className={styles.pagination}
					total={total}
					onChange={pageChange}
				/>
			</IceContainer>

			<CreateOriginData ref={refDialog} onOk={onOk} />
            <Drawer
                visible={showDrawer}
                placement='right'
                onClose={onCloseDrawer}
                width={600}
            >
				<OriginDataDetails {...values} />
            </Drawer>
		</Components.Wrap>
	);
}
