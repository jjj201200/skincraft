/*
 * @Author: jjj201200@gmail.com 
 * @Date: 2017-08-11 11:27:43 
 * @Last Modified by: jjj201200@gmail.com
 * @Last Modified time: 2017-08-12 00:30:28
 */
import React from 'react';
import ReactDom from 'react-dom';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';

import {
	Renderer
} from './apis';
import {
	ProgramReducer
} from './reducers';
import {
	LOAD_PROJECT
} from './actions';

import Scene from './scene';

let store = createStore(ProgramReducer, {});
export default class Skincraft extends React.Component {
	componentDidMount() {
		this.renderer = new Renderer();
		store.dispatch({ type: LOAD_PROJECT });
		console.log(store.getState());
	}
	render() {
		return (
			<Provider store={store}>
				<Scene className="scene">
				</Scene>
			</Provider>
		);
	}
}
