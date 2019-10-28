import React from 'react';
import {
	Table,
	Loading,
} from '@alifd/next';
import IceContainer from '@icedesign/container';

export default function AdCount() {
	const {
		parameter,
		response,
		loading,
		updateParameter,
	} = hooks.useRequest(api.getUserWorth);
	const {
		meta = [],
		data = [],
	} = response;

	const renderTitles = () => {
		return meta.map((item, index) => {
			return <Table.Column key={index} title={item} dataIndex={index.toString()} />;
		});
	};

	return (
		<Components.Wrap>
			<Components.Title title='单用户价值评估' />
			<IceContainer>
				<Loading visible={loading} inline={false}>
					<Table dataSource={data} hasBorder={false} >
						{renderTitles()}
					</Table>
				</Loading>
			</IceContainer>
		</Components.Wrap>
	);
}