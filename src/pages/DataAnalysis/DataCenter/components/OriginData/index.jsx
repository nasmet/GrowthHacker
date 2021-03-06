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

export default function OriginData() {
	const [showDrawer, setShowDrawer] = useState(false);
	const [values, setValues] = useState({});
	const refDialog = useRef(null);
	const [curPage, setCurPage] = useState(1);

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
		setCurPage(e);
		updateParameter({
			...parameter,
			offset: (e - 1) * config.LIMIT,
		});
	};

	const onDeleteOriginData = (id, index) => {
		Dialog.confirm({
			content: '确定删除吗？',
			onOk: () => {
				showLoading();
				api.deleteOriginData({
					id,
				}).then(() => {
					if (data.length <= 1) {
						const prePage = curPage - 1 === 0 ? 1 : curPage - 1;
						updateParameter({
							...parameter,
							offset: (prePage - 1) * config.LIMIT,
						});
						setCurPage(prePage);
					} else {
						updateParameter(parameter);
					}
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
		if (data.length < config.LIMIT) {
			data.push(value);
			updateResponse();
		} else {
			const temp = Math.ceil(total / config.LIMIT);
			const lastPage = total % config.LIMIT === 0 ? temp + 1 : temp;
			updateParameter({
				...parameter,
				offset: (lastPage - 1) * config.LIMIT,
			});
			setCurPage(lastPage);
		}
	};

	const onCloseDrawer = () => {
		setShowDrawer(false);
	};

	const onRefresh = () => {
		updateParameter(parameter);
	};

	const handleData = () => {
		return {
			sheetHeader: ["id", "名称", "标识符", "类型", "描述"],
			sheetData: data.map(item => [
				item.id,
				item.name,
				item.key,
				item.value_type,
				item.desc,
			]),
		}
	};

	const renderFirstColunm = (value, index, record) => {
		return <span>{ parameter.offset + index+1}</span>;
	};

	return (
		<Components.Wrap>
			<Button style={{marginBottom: '10px'}} type="secondary" onClick={onCreateOriginData}> 
				创建元数据
			</Button>
			<IceContainer>
				<div className='table-update-btns'>					
					<Components.Refresh onClick={onRefresh} />
					{data.length > 0 && <Components.ExportExcel fileName='元数据' handle={handleData} />}
				</div>
				<Loading visible={loading} inline={false}>
					<Table 
						dataSource={data} 
						hasBorder={false}
					>	
						<Table.Column title="id" dataIndex="id" cell={renderFirstColunm} width={120} />
						<Table.Column title="名称" dataIndex="name" width={120} />
						<Table.Column title="标识符" dataIndex="key" width={120} />
						<Table.Column title="类型" dataIndex="value_type" width={120} />
						<Table.Column title="描述" dataIndex="desc" />
						<Table.Column title="操作" cell={renderCover} />
					</Table>
				</Loading>

				<Pagination
					current={curPage}
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