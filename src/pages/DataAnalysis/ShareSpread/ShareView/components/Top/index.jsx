import React, {
	forwardRef,
	useImperativeHandle,
} from 'react';
import {
	Table,
} from '@alifd/next';
import styles from './index.module.scss';
import IceContainer from '@icedesign/container';

function Top({
	request,
	title,
	date,
	name,
}, ref) {
	useImperativeHandle(ref, () => ({
		update: date => {
			updateParameter({ ...parameter,
				date,
			});
		},
	}));

	const {
		response,
		loading,
		updateParameter,
		parameter,
	} = hooks.useRequest(request, {
		date,
	});

	const {
		users = [],
	} = response;

	const jump = openId => {
		model.history.push({
			pathname: '/dataanalysis/projectdata/ua/userscrutinydetails',
			state: {
				openId,
			}
		});
	};

	const renderSecondColumn = (value, index, record) => {
		return <span className={styles.openId} onClick={jump.bind(this, record.wechat_openid)} >{record.wechat_openid}</span>;
	};

	return (
		<IceContainer>				
			<Components.Title title={name} />
			<Table 
				loading={loading} 
				dataSource={users} 
				hasBorder={false}
			>
				<Table.Column title='Top排名' dataIndex='ranking_num' />
				<Table.Column title='openId' cell={renderSecondColumn} />
				<Table.Column title={title} dataIndex='count' />
			</Table>
		</IceContainer>	
	);
}

export default forwardRef(Top);