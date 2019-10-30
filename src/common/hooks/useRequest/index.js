import React, {
	useState,
	useEffect,
	useRef,
} from 'react';

export default function useRequest(request, param = {}, init = true) {
	const [response, setResponse] = useState({});
	const [loading, setLoading] = useState(false);
	const [parameter, setParameter] = useState(param);
	const refVarible = useRef({
		initRun: init,
	});
	useEffect(() => {
		if (!refVarible.current.initRun) {
			refVarible.current.initRun = true;
			return;
		}
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
		parameter,
		response,
		updateResponse,
		loading,
		updateParameter,
		showLoading,
		closeLoading,
	};
}