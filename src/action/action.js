
const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const DELETE_TODO = 'DELETE_TODO';
const SET_VISIBILITY = 'SET_VISIBILITY';
const INIT_TODO = 'INIT_TODO';

export const addTodo = (text,id) => {

	return {
		type: ADD_TODO,
		text,
		id
	}
}

export const setVisibility = (filter) => {
	return {
		type: SET_VISIBILITY,
		filter
	}
}

export const toggleTodo = (id) => {
	return {
		type:TOGGLE_TODO,
		id
	}
}


export const deleteTodo = (id) => {
	return {
		type:DELETE_TODO,
		id
	}
}


export const Init = (fetchTodos) => {
	return {
		type: INIT_TODO,
		fetchTodos
	}
}
