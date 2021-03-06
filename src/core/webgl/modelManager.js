/*
 * @Author: jjj201200@gmail.com 
 * @Date: 2017-08-18 12:36:22 
 * @Last Modified by: jjj201200@gmail.com
 * @Last Modified time: 2017-08-20 23:57:19
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
		this.proxy = 'http://127.0.0.1:3000';
	}
	getModelData(modelName) {
		let _t = this;
		if (_t.dtd === null) {
			_t.dfd = $.Deferred();
		}
		let modelData = this.modelDataList[modelName];
		if (modelData) {
			return _t.dfd.resolve();
		} else {
			let p = $.get(`/models/${modelName}.json`,{},()=>{},'text').then(
				(result) => {
					_t.modelDataList[modelName] = result;
					_t.dfd.resolve();
					return result;
				},
				(result) => {
					console.log(result)
					// _t.dfd.reject(`Failed to get model ${modelName}.`);
					console.error(`Failed to get model ${modelName}.`);
					return result;
				}
			);
			return p.promise();
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
				(result) => {
					let modelData = _t.modelDataList[modelName];
					let model = new Model(modelName, modelData);
					_t.modelObjects[modelName] = model;
					_t.currentModel = model;
					_t.dfd.resolve();
					return result;
				},
				(result) => {
					console.error(`Failed to set model ${modelName}.`);
					return result;
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
		return _t.setModel(modelName).then((result) => {
			let modelObject = _t.modelObjects[modelName];
			renderer.scene.add(model.mesh);
			_t.dfd = null;
			return true;
		}, (result) => {
			console.error(`Failed to load model ${modelName}.`);
			return result;
		});
	}
	drawTexture(textures, context) {

	}
}
