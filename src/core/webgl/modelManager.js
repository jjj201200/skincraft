/*
 * @Author: jjj201200@gmail.com 
 * @Date: 2017-08-18 12:36:22 
 * @Last Modified by: jjj201200@gmail.com
 * @Last Modified time: 2017-08-18 16:16:51
 */

import $ from 'jquery';
import { Model } from './model';

export class ModelManager {
	constructor() {
		this.init();
	}
	init() {
		/* initialize bisic data */
		this.currentModel = null;
		this.modelDataList = {};
		this.modelObjects = {};
		this.dtd = null;
	}
	getModelData(modelName) {
		let _t = this;
		if (_t.dtd === null) {
			_t.dfd = $.Deferred();
		}
		let modelData = this.modelDataList[modelName];
		if (model) {
			return _t.dfd.resolve();
		} else {
			return $.get('model/', { modelName: modelName }).then(
				modelData => {
					_t.modelDataList[modelName] = modelData;
					_t.dfd.resolve();
				},
				() => {
					_t.dfd.reject(`Failed to get model ${modelName}.`);
				}
			);
		}
	}
	setModel(modelName) {
		let _t = this,
			dtd = false;
		if (_t.dtd === null) {
			_t.dfd = $.Deferred();
			dtd = true;
		}
		let model = _t.modelObjects[modelName];
		if (model) {
			return _t.dfd.resolve();
		} else {
			return _t.getModelData(modelName).then(
				() => {
					let modelData = _t.modelDataList[modelName];
					let model = new Model(modelData);
					_t.modelObjects[modelName] = model;
					_t.currentModel = model;
					_t.dfd.resolve();
				},
				() => {
					_t.dfd.reject(`Failed to set model ${modelName}.`);
				}
			);
		}
	}
	/**
	 * add modelObject to renderer's scene
	 * @param  {string} modelName the model's name
	 * @param  {} renderer
	 */
	loadModel(modelName, renderer) {
		let _t = this;
		_t.dfd = $.Deferred();
		return _t.setModel(modelName).then(() => {
			let modelObject = _t.modelObjects[modelName];
			renderer.scene.add(model);
			_t.dfd = null;
		});
	}
	drawTexture(textures) {}
}
