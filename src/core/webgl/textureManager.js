/*
 * @Author: jjj201200@gmail.com 
 * @Date: 2017-08-18 13:21:28 
 * @Last Modified by: jjj201200@gmail.com
 * @Last Modified time: 2017-08-18 16:26:57
 */

import $ from 'jquery';
import {Texture} from './texture';

export class TextureManager {
	constructor() {
		this.init();
	}
	init() {
		/* initialize basic data */
		this.textureDataList = {};
		this.textureObejcts = {};
		this.currentTexture = null;
		/* create texture canvas & context */
		this.canvas = document.createElement('canvas');
		this.context = this.canvas.getContext('2d');
	}
	getTextureData(textureName) {
		let _t = this;
		if (_t.dtd === null) {
			_t.dfd = $.Deferred();
		}
		let textureData = this.textureDataList[textureName];
		if (texture) {
			return _t.dfd.resolve();
		} else {
			return $.get('texture/', { textureName: textureName }).then(
				textureData => {
					_t.textureDataList[textureName] = textureData;
					_t.dfd.resolve();
				},
				() => {
					_t.dfd.reject(`Failed to get texture ${textureName}.`);
				}
			);
		}
	}
	setTexture(textureName) {
		let _t = this,
			dtd = false;
		if (_t.dtd === null) {
			_t.dfd = $.Deferred();
			dtd = true;
		}
		let texture = _t.textureObjects[textureName];
		if (texture) {
			return _t.dfd.resolve();
		} else {
			return _t.getTextureData(textureName).then(
				() => {
					let textureData = _t.textureDataList[textureName];
					let texture = new Texture(textureData);
					_t.textureObjects[textureName] = texture;
					_t.currentTexture = texture;
					_t.dfd.resolve();
				},
				() => {
					_t.dfd.reject(`Failed to set texture ${textureName}.`);
				}
			);
		}
	}
	/**
	 * add textureObject to renderer's scene
	 * @param  {string} textureName the texture's name
	 * @param  {} renderer
	 */
	loadTexture(textureName) {
		let _t = this;
		_t.dfd = $.Deferred();
		return _t.setTexture(textureName).then(() => {
            let textureObject = _t.textureObjects[textureName];
            this.context2D.drawImage(textureObject.img, 0, 0);
			_t.dfd = null;
		});
	}
}
