import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {store} from './reducer';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//性能检测
import Perf from 'react-addons-perf';
window.Perf = Perf;

const render = () => ReactDOM.render(
	<Provider store={store}>
	<App />
	</Provider>
	, document.getElementById('root'));

store.subscribe(() => {
	render
});

render();

registerServiceWorker();
