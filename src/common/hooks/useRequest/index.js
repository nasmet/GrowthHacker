import React, {
	useState,
	useEffect,
	useRef,
} from 'react';

export default function useRequest(request, param = {}, init = true) {
	const [response, setResponse] = useState({});
	const [loading, setLoading] = useState(false);
	const refVarible = useRef({
		param,
	});

	function fetchData(param) {
		setLoading(true);
		request(param).then(res => {
			setResponse(res);
		}).catch(e => {
			model.log(e);
		}).finally(() => {
			setLoading(false);
		})
	}

	useEffect(() => {
		if (init) {
			fetchData(param);
		}

		return api.cancelRequest;
	}, []);

	function updateParameter(param) {
		refVarible.current.param = param;
		fetchData(param);
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
		parameter: refVarible.current.param,
		response,
		updateResponse,
		loading,
		updateParameter,
		showLoading,
		closeLoading,
	};
}