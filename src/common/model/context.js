import React, {
	createContext,
	useContext,
	useReducer
} from 'react';
export const Context = createContext();

export function Provider({
	reducer,
	initialState,
	children
}) {
	const [state, dispatch] = useReducer(reducer, initialState);
	
	return (
		<Context.Provider value={{state, dispatch}}>
    		{children}
  		</Context.Provider>
	)
}

export const useContextValue = () => useContext(Context);