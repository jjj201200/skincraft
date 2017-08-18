/*
 * @Author: jjj201200@gmail.com 
 * @Date: 2017-08-10 21:23:38 
 * @Last Modified by: jjj201200@gmail.com
 * @Last Modified time: 2017-08-18 16:24:13
 */
import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';

import './scene.scss';

import { RenderManager, TextureManager, ModelManager, Model, Steve } from '../apis';

export default class Scene extends React.Component {
	componentDidMount() {
		init();
		this.defaultOption = {
			modelName: 'steve',
			textureName: 'steve'
		};
	}
	init() {
		/* init scene size */
		this.width = $(window).width();
		this.height = $(window).height();
		$(this.refs.scene).width(this.width);
		$(this.refs.scene).height(this.height);
		this.aspactRatio = this.width / this.height;

		/* init managers */
		this.renderManager = new RenderManager(this.refs.scene);
		this.modelManager = new ModelManager();
		this.textureManager = new TextureManager();

		/* run default options */
		this.loadModel(this.defaultOption.modelName,this.defaultOption.textureName)
	}
	loadModel(modelName,textureName) {
		this.modelManager.loadModel(modelName, this.renderManager.renderer).then(() => {
			this.textureManager.loadTexture(textureName).then(() => {
				this.modelManager.drawTexture(this.textureManager.currentTexture);
			});
		});
	}

	render() {
		return (
			<div className="scene" ref="scene">
				<canvas className="D2" ref="D2" />
			</div>
		);
	}
}
