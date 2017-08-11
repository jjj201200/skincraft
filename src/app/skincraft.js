/*
 * @Author: jjj201200@gmail.com 
 * @Date: 2017-08-11 11:27:43 
 * @Last Modified by: jjj201200@gmail.com
 * @Last Modified time: 2017-08-11 16:40:51
 */
import React from 'react';
import ReactDom from 'react-dom';

import { Renderer } from './apis';

import Scene from './scene';

export default class Skincraft extends React.Component {
	componentDidMount() {
		this.renderer = new Renderer();
	}
	render() {
		return (
			<div>
				<Scene className="scene">
				</Scene>
			</div>
		);
	}
}
