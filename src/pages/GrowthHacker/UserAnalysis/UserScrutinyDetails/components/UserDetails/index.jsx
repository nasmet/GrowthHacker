import React, {
	Component,
	useState,
	useEffect,
} from 'react';
import {
	Input,
	Button,
	Tab,
	Table,
	Message,
	Loading,
	Pagination,
	Icon,
	Dialog,
	Select,
	Grid,
	DatePicker,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

export default function UserDetails({
	openId,
}) {
	const chartStyle = {
		x: 'device_brand',
		y: 'device_brand_count',
		color: 'device_brand',
		gLabel: (val, item) => {
			return `${item.point.device_brand}: ${val}`;
		}
	};

	const [city, setCity] = useState('');
	const [devices, setDevices] = useState([]);
	const [lastDevice, setLastDevice] = useState('');
	const [count, setCount] = useState(0);
	const [time, setTime] = useState('');
	const [userId, setUserId] = useState('');
	const [loading, setLoading] = useState(false);

	function getUserScrutinyDetails() {
		setLoading(true);
		api.getUserScrutinyDetails({
			openId,
		}).then((res) => {
			const {
				id,
				city,
				devices,
				last_login,
				login_count,
				last_login_device,
			} = res;
			setUserId(id);
			setCity(city);
			setTime(last_login);
			setCount(login_count);
			setLastDevice(last_login_device);
			setDevices(devices);
		}).catch((e) => {
			model.log(e);
		}).finally(() => {
			setLoading(false);
		});
	}

	useEffect(() => {
		getUserScrutinyDetails();

		return () => {
			api.cancelRequest();
		};
	}, []);

	return (
		<Loading visible={loading} inline={false}>
			<div className={styles.info}>
				<div className={styles.first}>
					<div className={styles.city}>
						<span className={styles.name}>城市：</span>
						<span className={styles.value}>{city}</span>
					</div>
					<div>
						<span className={styles.name}>ID：</span>
						<span className={styles.value}>{userId}</span>
					</div>
				</div>
				<div className={styles.second}>
					<p>
						<span className={styles.name}>上次访问设备：</span>
						<span className={styles.value}>{lastDevice}</span>
					</p>
					<p>
						<span className={styles.name}>近30天访问：</span>
						<span className={styles.value}>{count}</span>
					</p>
					<p>
						<span className={styles.name}>最近访问：</span>
						<span className={styles.value}>{utils.formatUnix(time,'Y-M-D')}</span>
					</p>
					<p>
						<span className={styles.name}>设备使用情况：</span>
					</p>
					<Components.BasicPercentSector data={devices} {...chartStyle}  />
				</div>
	  		</div>
  		</Loading>
	);
}