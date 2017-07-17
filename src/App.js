import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Init} from './action/action';

//fetch
import {getData} from './http/http';

//component
import AddTodo from './component/AddTodo';
import VisibilityTodo from './component/VisibilityTodo';
import Footer from './component/Footer';

class App extends Component {
	
constructor(props){
	super(props)
	this.dispatch = props.dispatch;
	this.url = 'http://localhost:8080/data'
}
componentWillMount(){
	getData(this.url)
		.then((res) =>{
			this.dispatch(Init(res.data))
		})
		.catch((err) => {
			console.log(err)
		})
}
  render() {
    return (
      <div className="App">
        <AddTodo />
        <VisibilityTodo />
        <Footer />
      </div>
    );
  }
}

export default connect()(App);
