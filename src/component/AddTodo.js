import React,{Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {addTodo} from '../action/action';
import {v4} from 'node-uuid';

import {postData} from '../http/http';

//性能优化
import PureRenderMixin from 'react-addons-pure-render-mixin';

const AddThunk = (value, id) => {
	return (dispatch, getState) => { 
		postData('http://localhost:8080/add',{'text':value, 'id':id})
			.then((res) => {
				res.status === 0 ?
				alert(res.info) :
				dispatch(addTodo(value, id))
			})
			.catch((err) => {
				console.log(err)
			})	
	}
}

class AddTodo extends Component{
	constructor(props){
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.dispatch = props.dispatch;
	}
	
	render(){
		return (
			<div>
				<input  ref = {node => {
					this.input = node;
				}}/>
				<button onClick = {() => {
					if(!this.input.value.trim()){return}
					this.dispatch(AddThunk(this.input.value, v4()))
					this.input.value = ''
				}}>
				add
				</button>
			</div>
		)
	}
}

//
//AddTodo.propTypes = {
//dispatch: PropTypes.func.isRequired
//}

export default connect()(AddTodo);