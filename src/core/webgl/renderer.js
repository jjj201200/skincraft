/*
 * @Author: jjj201200@gmail.com 
 * @Date: 2017-08-11 15:25:54 
 * @Last Modified by:   jjj201200@gmail.com 
 * @Last Modified time: 2017-08-11 15:25:54 
 */

import {
	THREE,
	WebGLRenderer,
	CanvasRenderer,
	PCFSoftShadowMap,
	Scene,
    PerspectiveCamera,
    Vector3,
} from 'three';
import { TWEEN } from '@tweenjs/tween.js';

export class Renderer {
	constructor() {
		this.initRenderer();
		// this.initCamera();
	}
	webglAvailable() {
		return (window.requestAnimFrame = (function() {
			return (
				window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				function(callback) {
					window.setTimeout(callback, 1000 / 60);
				}
			);
		})());
	}
	initRenderer() {
		this.renderer = this.webglAvailable()
			? new WebGLRenderer({
					alpha: true,
					antialias: true,
					shadowMap: PCFSoftShadowMap,
					precision: 'lowp'
				})
			: new CanvasRenderer();
		this.renderer.shadowMap.enabled = true;

		this.scene = new Scene();
	}
	initCamera(canvasWidth,canvasHeight) {
		this.camera = new PerspectiveCamera(
			45,
			width / height,
			0.1,
			10000
		);
		this.camera.animation = {};
		this.camera.animation.speed = 300;
		this.camera.animation.moved = false;
		this.camera.animation.positionMoved = false;
		this.camera.animation.targetMoved = false;
		this.camera.animation.zoomMoved = false;
		this.camera.animation.target = new Vector3(0, 0, 0);
	}
	initDomElement() {
		let [width, height] = [
			this.domElement.innerWidth(),
			this.domElement.innerHeight()
		];
		[this.canvasWidth, this.canvasWidth] = [width, height];
	}
}
