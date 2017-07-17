import React,{Component} from 'react';
import {connect} from 'react-redux';
import {setVisibility} from '../action/action';

import PureRenderMixin from 'react-addons-pure-render-mixin';

const FilterLink = ({filter, current, onVisibility ,children}) => {
	if(filter === current){
		return (
			<span>{children}</span>
		)
	}
	return(
		<a href='#' 
			onClick = {e => {
				e.preventDefault();
				onVisibility(filter);
			}}
		>
			{children}
		</a>
	)
}

class Footer extends Component{
	constructor(props){
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
		return (
			<div>
				Show:
				{'  '}
				<FilterLink filter="SHOW_ALL" 
				current={this.props.visibilityFilter} 
				onVisibility={this.props.visibility}
				>
				All
				</FilterLink>
				{'  '}
				<FilterLink filter="SHOW_ACTIVE" 
				current={this.props.visibilityFilter} 
				onVisibility={this.props.visibility}
				>
				Active
				</FilterLink>
				{'  '}
				<FilterLink filter="SHOW_COMPLETED" 
				current={this.props.visibilityFilter} 
				onVisibility={this.props.visibility}
				>
				Completed
				</FilterLink>
			</div>
		)
	}
}


const mapStateToProps = (state) => {
	return {
		visibilityFilter:state.visibilityFilter
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		visibility: (filter) => {
			dispatch(setVisibility(filter))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);