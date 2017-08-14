/*
 * @Author: jjj201200@gmail.com 
 * @Date: 2017-08-11 15:25:54 
 * @Last Modified by: jjj201200@gmail.com
 * @Last Modified time: 2017-08-13 14:53:45
 */
import $ from 'jquery';
import {
	THREE,
	WebGLRenderer,
	CanvasRenderer,
	PCFSoftShadowMap,
	Scene,
	PerspectiveCamera,
	Vector3,
	Vector2,
} from 'three';
import { TWEEN } from '@tweenjs/tween.js';

import { Camera } from './camera';
import { Controller } from './controller';

export class Renderer {
	constructor(canvasDom) {
		this.initRenderer();

		this.canvasDom = canvasDom;
		this.canvasWidth = this.canvasDom.innerWidth();
		this.canvasHeight = this.canvasDom.innerHeight();
		this.camera = new Camera(this.canvasWidth, this.canvasHeight);
		this.Controller = new Controller(this.renderer, this.camera, this.scene);
		this.scene = new Scene();
		this.state = {
			editorSize: 100,
			inited: false,
			scale: 1,
			mouse: new Vector2(0, 0), //z=-1 important!
			able: false
		}
		this.initEvent();
	}
	webglAvailable() {
		return (window.requestAnimFrame = (function () {
			return (
				window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				function (callback) {
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
	}
	initEvent(){
		$(window).off('resize').on('resize', function () {
            _this.resizeCanvas();
        });
	}
	render() {
		this.renderer.render(this.scene, this.camera);
	};
	addModel(model) {
		this.model = model;
		this.scene.add(this.model.mesh);
		// console.log(this.model.mesh.children, this.model.mesh.children.length)
		this.camera.lookAt(this.model.focuseTarget);
		this.addChild(this.model.mesh.children);
	};
	resetCamera() {
		this.camera.position.x = 0;
		this.camera.position.y = 0;
		this.camera.position.z = this.editor.editorSize / 2;
		this.camera.lookAt(this.camera.animation.target);
		if (this.controls) this.controls.target = this.camera.animation.target;
		return this;
	};
	cameraAnimation({ position, target, zoom, controls = false }) {
		if (this.camera.animation.moved === false) {
			//position
			let _this = this;
			if (position !== undefined) {
				let originalPosition = {
					x: _this.camera.position.x,
					y: _this.camera.position.y,
					z: _this.camera.position.z
				};
				new TWEEN.Tween(originalPosition).to({
					x: position.x,
					y: position.y,
					z: position.z
				}, _this.camera.animation.speed).easing(TWEEN.Easing.Quadratic.InOut).onStart(function () {
					_this.camera.animation.moved = true;
					_this.camera.animation.positionMoved = true;
				}).onUpdate(function () {
					_this.camera.position = new THREE.Vector3(this.x, this.y, this.z);
				}).onComplete(function () {
					if (_this.camera.animation.targetMoved === false && _this.camera.animation.zoomMoved === false)
						_this.camera.animation.moved = false;
					_this.camera.animation.positionMoved = false;
				}).start();
			}
			//target
			if (target !== undefined) {
				let originalTarget = {
					x: _this.model.focuseTarget.x,
					y: _this.model.focuseTarget.y,
					z: _this.model.focuseTarget.z
				};
				new TWEEN.Tween(originalTarget).to({
					x: target.x,
					y: target.y,
					z: target.z
				}, _this.camera.animation.speed).easing(TWEEN.Easing.Quadratic.InOut).onStart(function () {
					_this.camera.animation.moved = true;
					_this.camera.animation.targetMoved = true;
				}).onUpdate(function () {
					_this.camera.animation.target = new THREE.Vector3(this.x, this.y, this.z);
					_this.model.focuseTarget = new THREE.Vector3(this.x, this.y, this.z);
					_this.camera.lookAt(_this.camera.animation.target);
					if (controls) _this.controls.target = _this.camera.animation.target;
				}).onComplete(function () {
					if (_this.camera.animation.positionMoved === false && _this.camera.animation.zoomMoved === false)
						_this.camera.animation.moved = false;
					_this.camera.animation.targetMoved = false;
				}).start();
			}
			//zoom
			if (zoom !== undefined) {
				let originalZoom = {
					zoom: _this.camera.zoom
				};
				new TWEEN.Tween(originalZoom).to({
					zoom: zoom
				}, _this.camera.animation.speed).easing(TWEEN.Easing.Quadratic.InOut).onStart(function () {
					_this.camera.animation.moved = true;
					_this.camera.animation.zoomMoved = true;
				}).onUpdate(function () {
					_this.camera.animation.zoom = this.zoom;
					_this.controls.object.zoom = _this.camera.animation.zoom;
					_this.controls.object.updateProjectionMatrix();
					_this.controls.update();
				}).onComplete(function () {
					if (_this.camera.animation.positionMoved === false && _this.camera.animation.targetMoved === false)
						_this.camera.animation.moved = false;
					_this.camera.animation.zoomMoved = false;
				}).start();
			}
		}
	};
}
