import {createStore, combineReducers, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const initialState = []

const initialFilter = 'SHOW_ALL';

const todos = (state = initialState, action) => {
	switch(action.type){
		case 'ADD_TODO':
			return [
				...state,
				{
					id: action.id,
					text: action.text,
					completed: false
				}
			]
		case 'TOGGLE_TODO':
			return state.map(item => {
				if(item.id !== action.id){return item}
				return {
					...item,
					completed: !item.completed
				}
			})
		case 'DELETE_TODO':
			return state.filter(item => item.id !== action.id);
		case 'INIT_TODO':
			return state.concat(action.fetchTodos)
		default:
			return state;
	}
}

const visibilityFilter = (state = initialFilter, action) => {
	switch(action.type){
		case 'SET_VISIBILITY':
			return action.filter;
		default:
			return state;
	}
}

export const store = createStore(
	combineReducers({todos, visibilityFilter}),
	applyMiddleware(logger, thunk)
)
