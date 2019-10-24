import React from 'react';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

export default function Step({
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
					{index !== maxIndex ?
						<div className={styles.second}>
							<svg data-step="1" width="100" height="44" xmlns="http://www.w3.org/2000/svg">
								<g>						    	
									<g fill="none" fillRule="evenodd">						    	
										<g fill='#EAEFF4' >						        		
											<polygon points="18,0 82,0 82,20 100,20 50,44 0,20 18,20 " style={{strokeWidth: 1, stroke: 'rgba(0,0,0,0.12)'}} />						            		
										</g>						          		
									</g>						       		
								</g>						      	
							</svg>						    
							<span className={styles.rate}>{rate*100}%</span>						 	
						</div> : null					    
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