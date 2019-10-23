import React, {
	Component,
	useState,
	useEffect,
} from 'react';

export default function useRequest(request, param = {}) {
	const [response, setResponse] = useState({});
	const [loading, setLoading] = useState(false);
	const [parameter, setParameter] = useState(param);

	useEffect(() => {
		setLoading(true);
		request(parameter).then(res => {
			setResponse(res);
		}).catch(e => {
			model.log(e);
		}).finally(() => {
			setLoading(false);
		})

		return () => {
			api.cancelRequest();
		};
	}, [parameter]);


	function updateParameter(param) {
		setParameter(param);
	}

	function showLoading() {
		setLoading(true);
	}

	function closeLoading() {
		setLoading(false);
	}

	function updateResponse() {
		setResponse({ ...response
		});
	}

	return {
		response,
		updateResponse,
		loading,
		updateParameter,
		showLoading,
		closeLoading,
	};
}