/*
 * @Author: jjj201200@gmail.com 
 * @Date: 2017-08-10 21:23:38 
 * @Last Modified by: jjj201200@gmail.com
 * @Last Modified time: 2017-08-16 13:30:21
 */
import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';

import './scene.scss';

import { Renderer, Model, Steve } from '../apis';

export default class Scene extends React.Component {
	componentDidMount() {
		let _this = this;
		this.options = {
			modelName: 'steve',
			typeIndex: 0,
			versionIndex: 0,
			domElement: undefined
		};
		this.canvasD2DOM = this.refs.D2;
		// this.canvasD3DOM = this.refs.D3;
		this.renderer = new Renderer({
			DOM:this.refs.scene,
			canvasD2DOM: _this.canvasD2DOM,
			// canvasD3DOM: _this.canvasD3DOM
		});
		this.loadModel();
		// this.renderer.drawSkin();
	}
	loadModel() {
		// let _this = this;
		this.model = this.initModel(Steve);
		this.renderer.loadModel(this.model);
		// console.log(this.model);
		// this.init2DCanvas(this.model)
		// _this.renderer.addModel(_this.model);
		// console.log(modelName);
		// require([modelName], function(model) {
		// 	if (model != undefined && model instanceof Model) {
		// 		// _this.queue = new Queue(model);

		// 		_this.renderer.addModel(_this.model);
		// 	} else throw new Error('no model');
		// 	return _this;
		// });
	}
	initModel(modelData) {
		return new Model(
			modelData /* , function(model) {
			if (model.skin && model.skin.height) model.versionIndex = 0;
			else model.versionIndex = 1;
		} */
		);
	}

	render() {
		return (
			<div className="scene" ref="scene">
				
				<canvas className="D2" ref="D2" />
			</div>
		);
	}
}
