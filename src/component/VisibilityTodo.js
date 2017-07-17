import React,{Component} from 'react';
import {connect} from 'react-redux';
import {toggleTodo, deleteTodo} from '../action/action';
//import PropTypes from 'prop-types'

import {postData} from '../http/http';

import PureRenderMixin from 'react-addons-pure-render-mixin';

//重新过滤
const getVisibleTodos = (todos, filter) => {
	switch(filter){
		case 'SHOW_ALL':
			return todos;
		case 'SHOW_ACTIVE':
			return todos.filter(t => t.completed);
		case 'SHOW_COMPLETED':
			return todos.filter(t => !t.completed);
		default:
			return todos;
	}
}

class VisibilityTodo extends Component{
	
	constructor(props){
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	
	render(){
		
		const { todos, visibilityFilter } = this.props;
		
		const visibleTodo = getVisibleTodos( todos,visibilityFilter)
		
		return (
			<div>
				<ul>
					{
						visibleTodo.map(item =>
							<li key={item.id}>
							<span onClick={()=>{this.props.toggle(item.id)}} style = {{textDecoration : item.completed ? 'line-through' : 'none'}}>{item.text}</span>
							&#12288;&#12288;&#12288;
							<span onClick={()=>{this.props.delete(item.id)}}>删除</span>
							</li>	
						)
					}
				</ul>
			</div>
		)
	}
}

//使用中间件做dispatch
const ToggleThunk = (id) => {
	return (dispatch, getState) => {
		postData('http://localhost:8080/update',{'id':id})
			.then((res) => {
				res.status === 0 ?
				alert(res.info) :
				dispatch(toggleTodo(id))
			})
			.catch((err) => {
				console.log(err)
			})	
	}
}


const DeleteThunk = (id) => {
	return (dispatch, getState) => {
		postData('http://localhost:8080/delete',{'id':id})
			.then((res) => {
				res.status === 0 ?
				alert(res.info) :
				dispatch(deleteTodo(id))
			})
			.catch((err) => {
				console.log(err)
			})	
	}
}

const mapStateToProps = (state) => {
	return {
		todos: state.todos,
		visibilityFilter: state.visibilityFilter
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		toggle: (id) => {
			dispatch(ToggleThunk(id))
		},
		delete: (id) => {
			dispatch(DeleteThunk(id))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(VisibilityTodo);
