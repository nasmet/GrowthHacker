import React from 'react';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

export default function Steps({
	steps,
	totalRate,
}) {
	const renderStep = () => {
		const maxIndex = steps.length - 1;
		return steps.map((item, index) => {
			const {
				name,
				count,
				rate,
			} = item;
			return (
				<div key={index} className={styles.container}>
					<div className={styles.first}>
						<div className={styles.left}>
							<span className={styles.index}>{index+1}</span>
							<span>{name}</span>	
						</div>
						<span>{count}人</span>
					</div>
					{index !== maxIndex &&
						<div className={styles.second}>
							<svg width="100" height="44" version="1.1" xmlns="http://www.w3.org/2000/svg">				        		
								<polygon points="18,0 82,0 82,20 100,20 50,44 0,20 18,20 " style={{fill:'none',stroke:'gray',strokeWidth:1}} />			            															      	
							</svg>						    
							<span className={styles.rate}>{rate}</span>						 	
						</div>					    
					}
				</div>
			)
		});
	}

	return (
		<IceContainer>
			<div className={styles.head}>
				<div className={styles.headLeft}>{totalRate}</div>
				<div className={styles.headRight}>
					{renderStep()}
				</div>
			</div>
		</IceContainer>
	);
}